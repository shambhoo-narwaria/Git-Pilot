import ora from 'ora';
import chalk from 'chalk';
import { GitService } from '../services/git.service.js';
import { logger } from '../utils/logger.js';

export async function pull(): Promise<void> {
  const git = new GitService();

  logger.header('GitPilot  ·  pull');

  try {
    await git.assertIsRepo();
  } catch {
    logger.error('Not inside a Git repository');
    process.exit(1);
  }

  const status = await git.getStatus();
  if (status.hasChanges) {
    logger.blank();
    logger.warn('You have uncommitted changes. (use "aigit ship" first to avoid conflicts)');
    logger.blank();
    process.exit(0);
  }

  const spinner = ora({ text: 'Pulling from remote…', color: 'blue' }).start();
  try {
    await git.pull();
    spinner.stopAndPersist({
      symbol: chalk.blue('›'),
      text: chalk.green('Successfully pulled latest changes'),
    });
  } catch (err: any) {
    spinner.fail(chalk.red(err.message));
    process.exit(1);
  }

  logger.blank();
}
