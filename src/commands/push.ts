import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { GitService } from '../services/git.service.js';
import { BranchInfo } from '../types/index.js';
import { logger } from '../utils/logger.js';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

async function promptConfirmPush(branch: BranchInfo): Promise<boolean> {
  const target = branch.hasUpstream
    ? chalk.white(branch.upstream!)
    : chalk.hex('#A78BFA')(`origin/${branch.current}`) + chalk.dim(' (new upstream)');

  logger.blank();
  logger.info(
    `Ready to push ${chalk.bold.hex('#A78BFA')(branch.current)} to ${target}`
  );

  const { confirmed } = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'confirmed',
      message: chalk.cyan('Continue?'),
      default: true,
    },
  ]);
  return confirmed as boolean;
}

// ─────────────────────────────────────────────
// Push command
// ─────────────────────────────────────────────

export async function push(): Promise<void> {
  const git = new GitService();

  logger.header('GitPilot  ·  push');

  // ── Step 1: Validate git repo ────────────────
  {
    const spinner = ora({ text: 'Checking Git repository…', color: 'magenta' }).start();
    try {
      await git.assertIsRepo();
      spinner.succeed(chalk.green('Git repository detected'));
    } catch {
      spinner.fail(chalk.red('Not inside a Git repository'));
      process.exit(1);
    }
  }

  // ── Step 2: Detect branch + upstream ─────────
  let branch: BranchInfo;
  {
    const spinner = ora({ text: 'Detecting branch…', color: 'blue' }).start();
    branch = await git.getBranchInfo();

    if (!branch.hasUpstream) {
      spinner.info(
        chalk.yellow(
          `Branch "${branch.current}" has no upstream — will set automatically`
        )
      );
    } else {
      spinner.succeed(
        chalk.green(
          `Branch: ${chalk.bold(branch.current)} -> ${branch.upstream}`
        )
      );
    }
  }

  // ── Step 3: Confirm ───────────────────────────
  const confirmed = await promptConfirmPush(branch);
  if (!confirmed) {
    logger.warn('Push cancelled.');
    process.exit(0);
  }

  // ── Step 4: Push ──────────────────────────────
  {
    const spinner = ora({ text: 'Pushing to remote…', color: 'magenta' }).start();
    try {
      await git.push(branch);
      const destination = branch.hasUpstream
        ? branch.upstream!
        : `origin/${branch.current}`;
      spinner.succeed(
        chalk.green(`Pushed ${chalk.bold(branch.current)} to ${destination}`)
      );
    } catch (err: any) {
      spinner.fail(chalk.red(err?.message ?? 'Push failed'));
      process.exit(1);
    }
  }

  // ── Done ─────────────────────────────────────
  logger.blank();
  console.log(chalk.bold.hex('#A78BFA')('  Changes pushed to remote!'));
  logger.blank();
}
