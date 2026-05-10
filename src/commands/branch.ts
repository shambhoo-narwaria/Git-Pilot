import ora from 'ora';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { GitService } from '../services/git.service.js';
import { logger } from '../utils/logger.js';

export async function branch(branchName?: string): Promise<void> {
  const git = new GitService();

  logger.header('GitPilot  ·  branch');

  try {
    await git.assertIsRepo();
  } catch {
    logger.error('Not inside a Git repository');
    process.exit(1);
  }

  const status = await git.getStatus();
  if (status.hasChanges) {
    logger.warn('You have uncommitted changes. (use "aigitt ship" to stage and commit before switching)');
    logger.blank();
    process.exit(0);
  }

  const branches = await git.getLocalBranches();

  // If a branch name is provided, create and switch
  if (branchName) {
    logger.blank();
    if (branches.all.includes(branchName)) {
      // Just switch
      await git.checkout(branchName);
      console.log(`  ${chalk.blue('›')} Switched to existing branch: ${chalk.bold(branchName)}`);
    } else {
      // Create and switch
      await git.createBranch(branchName);
      console.log(`  ${chalk.blue('›')} Created and switched to branch: ${chalk.bold(branchName)}`);
    }
    logger.blank();
    return;
  }

  // Interactive selection
  if (branches.all.length <= 1) {
    logger.blank();
    logger.warn(`You only have one branch: ${chalk.bold(branches.current)}`);
    logger.info('(use "aigitt branch <name>" to create a new one)');
    logger.blank();
    return;
  }

  logger.blank();
  const { selectedBranch } = await inquirer.prompt([
    {
      type: 'select',
      name: 'selectedBranch',
      message: chalk.cyan('Select a branch to switch to:'),
      prefix: chalk.blue('›'),
      choices: [
        ...branches.all.map(b => ({
          name: b === branches.current ? `${b} (current)` : b,
          value: b,
          disabled: b === branches.current
        })),
        { name: chalk.dim('Cancel / Exit'), value: 'exit' }
      ],
      pageSize: 10,
    }
  ]);

  process.stdout.write('\x1b[1A\x1b[2K'); // Clear the prompt line

  if (selectedBranch === 'exit') {
    logger.blank();
    process.exit(0);
  }

  if (selectedBranch && selectedBranch !== branches.current) {
    const spinner = ora({ text: `Switching to ${selectedBranch}…`, color: 'blue' }).start();
    try {
      await git.checkout(selectedBranch);
      spinner.stopAndPersist({
        symbol: chalk.blue('›'),
        text: chalk.green(`Switched to branch: ${chalk.bold(selectedBranch)}`),
      });
    } catch (err: any) {
      spinner.fail(chalk.red(err.message));
      process.exit(1);
    }
  }

  logger.blank();
}
