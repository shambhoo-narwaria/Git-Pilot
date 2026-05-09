import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { GitService } from '../services/git.service.js';
import { GitStatus, ShipOptions } from '../types/index.js';
import { logger } from '../utils/logger.js';

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function renderStatus(status: GitStatus): void {
  const sections: Array<{ label: string; files: string[]; render: (f: string) => void }> = [
    { label: 'Modified',  files: status.modified,  render: logger.fileModified.bind(logger) },
    { label: 'Added',     files: status.added,     render: logger.fileAdded.bind(logger)    },
    { label: 'Deleted',   files: status.deleted,   render: logger.fileDeleted.bind(logger)  },
    { label: 'Renamed',   files: status.renamed,   render: logger.fileRenamed.bind(logger)  },
    { label: 'Untracked', files: status.untracked, render: logger.fileUntracked.bind(logger)},
  ];

  let firstSection = true;
  sections
    .filter((s) => s.files.length > 0)
    .forEach((s) => {
      if (!firstSection) logger.blank();
      firstSection = false;
      logger.section(chalk.bold(s.label + ':'));
      s.files.forEach((f) => s.render(f));
    });

  logger.blank();
}

async function promptCommitMessage(prefill?: string): Promise<string> {
  const { message } = await inquirer.prompt([
    {
      type: 'input',
      name: 'message',
      message: chalk.cyan('Enter commit message:'),
      prefix: chalk.blue('›'),
      default: prefill,
      validate: (input: string) => {
        if (!input.trim()) return chalk.red('Commit message cannot be empty');
        return true;
      },
    },
  ]);
  return (message as string).trim();
}

// ─────────────────────────────────────────────
// Main ship command
// ─────────────────────────────────────────────

export async function ship(options: ShipOptions = {}): Promise<void> {
  const git = new GitService();

  logger.header('GitPilot  ·  ship');

  // ── Step 1: Validate git repo ────────────────
  {
    try {
      await git.assertIsRepo();
    } catch {
      logger.error('Not inside a Git repository');
      process.exit(1);
    }
  }

  // ── Step 2: Show changed files ───────────────
  let status: GitStatus;
  {
    const spinner = ora({ text: 'Reading working tree…', color: 'cyan' }).start();
    status = await git.getStatus();
    spinner.stop();

    if (!status.hasChanges) {
      logger.blank();
      if (status.ahead > 0) {
        logger.info('(use "aigit push" to publish)');
      } else {
        logger.warn('Nothing to ship — working tree is clean.');
      }
      logger.blank();
      process.exit(0);
    }

    renderStatus(status);
  }

  // ── Step 3: Stage all files ──────────────────
  {
    const spinner = ora({ text: 'Staging changes…', color: 'yellow' }).start();
    await git.stageAll();
    spinner.stopAndPersist({
      symbol: chalk.blue('›'),
      text: chalk.green('All changes staged'),
    });
  }

  // ── Step 4: Commit message ───────────────────
  let commitMessage: string;
  if (options.message) {
    commitMessage = options.message.trim();
    if (!commitMessage) {
      logger.error('Commit message cannot be empty (--message flag was blank)');
      process.exit(1);
    }
    logger.info(`Using commit message: ${chalk.italic(commitMessage)}`);
  } else {
    commitMessage = await promptCommitMessage();
    process.stdout.write('\x1b[1A\x1b[2K');
  }

  // ── Step 5: Commit ───────────────────────────
  {
    const spinner = ora({ text: 'Committing…', color: 'green' }).start();
    try {
      await git.commit(commitMessage);
      spinner.stopAndPersist({
        symbol: chalk.blue('›'),
        text: chalk.green(`Committed: "${commitMessage}"`),
      });
    } catch (err: any) {
      spinner.fail(chalk.red(err?.message ?? 'Commit failed'));
      process.exit(1);
    }
  }

  // ── Done ─────────────────────────────────────
  logger.blank();
  console.log(chalk.bold.hex('#A78BFA')('Changes committed locally!'));
  logger.blank();
}
