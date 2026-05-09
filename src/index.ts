#!/usr/bin/env node
import { Command } from 'commander';
import chalk from 'chalk';
import { ship } from './commands/ship.js';
import { push } from './commands/push.js';
import { branch } from './commands/branch.js';
import { APP_VERSION } from './constants/index.js';

const program = new Command();

// ─── Branding ────────────────────────────────────────────────────
const brand =
  '\n' +
  chalk.bold.hex('#7C3AED')('  ⚡ GitPilot') +
  chalk.dim(' — AI-powered Git workflow automation') +
  '\n';

// ─── Program meta ────────────────────────────────────────────────
program
  .name('aigit')
  .version(APP_VERSION, '-v, --version', 'Output the current version')
  .description(brand)
  .addHelpText('beforeAll', brand);

// ─── ship command ────────────────────────────────────────────────
program
  .command('ship')
  .description('Stage all changes and commit locally')
  .option('-m, --message <msg>', 'Commit message (skip the prompt)')
  .action(async (opts) => {
    try {
      await ship({ message: opts.message });
    } catch (err: any) {
      console.error(chalk.red('\n✖ Unexpected error: ') + err.message);
      process.exit(1);
    }
  });

// ─── push command ────────────────────────────────────────────────
program
  .command('push')
  .description('Push committed changes to the remote repository')
  .action(async () => {
    try {
      await push();
    } catch (err: any) {
      console.error(chalk.red('\n✖ Unexpected error: ') + err.message);
      process.exit(1);
    }
  });

// ─── branch command ──────────────────────────────────────────────
program
  .command('branch [name]')
  .description('Interactive branch switching, or create a new branch')
  .action(async (name) => {
    try {
      await branch(name);
    } catch (err: any) {
      console.error(chalk.red('\n✖ Unexpected error: ') + err.message);
      process.exit(1);
    }
  });

// ─── status command (quick alias) ────────────────────────────────
program
  .command('status')
  .description('Show working-tree status in a clean, readable format')
  .action(async () => {
    const { GitService } = await import('./services/git.service.js');
    const { logger } = await import('./utils/logger.js');

    const git = new GitService();

    logger.header('GitPilot  ·  status');

    try {
      await git.assertIsRepo();
    } catch {
      logger.error('Not inside a Git repository');
      process.exit(1);
    }

    const status = await git.getStatus();

    if (!status.hasChanges) {
      logger.blank();
      if (status.ahead > 0) {
        logger.info('(use "aigit push" to publish)');
      } else {
        logger.info('Working tree clean — nothing to show.');
      }
      logger.blank();
      return;
    }

    let firstSection = true;
    const printSection = (
      label: string,
      files: string[],
      fn: (f: string) => void
    ) => {
      if (!files.length) return;
      if (!firstSection) logger.blank();
      firstSection = false;
      logger.section(chalk.bold(label + ':'));
      files.forEach(fn);
    };

    printSection('Modified', status.modified, logger.fileModified.bind(logger));
    printSection('Added', status.added, logger.fileAdded.bind(logger));
    printSection('Deleted', status.deleted, logger.fileDeleted.bind(logger));
    printSection('Renamed', status.renamed, logger.fileRenamed.bind(logger));
    printSection('Untracked', status.untracked, logger.fileUntracked.bind(logger));
    logger.blank();

    logger.info('(use "aigit ship" to stage and commit)');
    logger.blank();
  });

// ─── Parse ───────────────────────────────────────────────────────
program.parse(process.argv);
