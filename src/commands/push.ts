import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { GitService } from '../services/git.service.js';
import { BranchInfo } from '../types/index.js';
import { logger } from '../utils/logger.js';
import { DEFAULT_REMOTE } from '../constants/index.js';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

/** Basic check that the input looks like a Git remote URL. */
function isValidRemoteUrl(url: string): boolean {
  return (
    url.startsWith('https://') ||
    url.startsWith('git@') ||
    url.startsWith('http://')
  );
}

async function promptRemoteUrl(): Promise<string> {
  const { url } = await inquirer.prompt([
    {
      type: 'input',
      name: 'url',
      message: chalk.cyan('Enter GitHub repo URL:'),
      prefix: chalk.blue('›'),
      validate: (input: string) => {
        if (!input.trim()) return 'URL cannot be empty';
        if (!isValidRemoteUrl(input.trim()))
          return 'Must be a valid Git URL (https://... or git@...)';
        return true;
      },
    },
  ]);
  return (url as string).trim();
}

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
      prefix: chalk.blue('›'),
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
    try {
      await git.assertIsRepo();
    } catch {
      logger.error('Not inside a Git repository');
      process.exit(1);
    }
  }

  // ── Step 2: Check remote exists ──────────────
  {
    const spinner = ora({ text: `Checking remote "${DEFAULT_REMOTE}"…`, color: 'cyan' }).start();
    const remoteExists = await git.hasRemote(DEFAULT_REMOTE);

    if (remoteExists) {
      spinner.stop();
    } else {
      spinner.warn(chalk.yellow(`No remote "${DEFAULT_REMOTE}" found`));
      logger.blank();

      const url = await promptRemoteUrl();
      process.stdout.write('\x1b[1A\x1b[2K');

      const addSpinner = ora({ text: `Adding remote "${DEFAULT_REMOTE}"…`, color: 'cyan' }).start();
      try {
        await git.addRemote(DEFAULT_REMOTE, url);
        addSpinner.stopAndPersist({
          symbol: chalk.blue('›'),
          text: chalk.green(`Remote "${DEFAULT_REMOTE}" added → ${url}`),
        });
      } catch (err: any) {
        addSpinner.fail(chalk.red(err?.message ?? 'Failed to add remote'));
        process.exit(1);
      }
    }
  }

  // ── Step 3: Detect branch + upstream ─────────
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
      spinner.stop();
      console.log(`  Branch: ${chalk.bold(branch.current)}`);
    }
  }

  // ── Step 3.5: Check if there's anything to push ─
  const status = await git.getStatus();
  if (branch.hasUpstream && status.ahead === 0) {
    if (status.hasChanges) {
      logger.warn('You have uncommitted changes. (use "aigitt ship" to stage and commit)');
    } else {
      logger.warn('Everything up-to-date. Nothing to push.');
    }
    logger.blank();
    process.exit(0);
  }

  // ── Step 4: Confirm ───────────────────────────
  const confirmed = await promptConfirmPush(branch);
  process.stdout.write('\x1b[1A\x1b[2K');
  if (!confirmed) {
    logger.warn('Push cancelled.');
    logger.blank();
    process.exit(0);
  }

  // ── Step 5: Push ──────────────────────────────
  {
    const spinner = ora({ text: 'Pushing to remote…', color: 'magenta' }).start();
    try {
      await git.push(branch);
      const destination = branch.hasUpstream
        ? branch.upstream!
        : `origin/${branch.current}`;
      spinner.stopAndPersist({
        symbol: chalk.blue('›'),
        text: chalk.green(`Pushed ${chalk.bold(branch.current)} to ${destination}`),
      });
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
