import chalk from 'chalk';

export const logger = {
  success: (msg: string) => console.log(chalk.green('✔ ') + chalk.white(msg)),
  error: (msg: string) => console.log(chalk.red('✖ ') + chalk.white(msg)),
  info: (msg: string) => console.log(chalk.cyan('ℹ ') + chalk.white(msg)),
  warn: (msg: string) => console.log(chalk.yellow('⚠ ') + chalk.white(msg)),
  dim: (msg: string) => console.log(chalk.dim(msg)),
  blank: () => console.log(''),

  header: (title: string) => {
    const line = chalk.hex('#7C3AED')('━'.repeat(50));
    console.log('');
    console.log(line);
    console.log(
      chalk.bold.hex('#A78BFA')('  ⚡ ' + title)
    );
    console.log(line);
  },

  section: (title: string) => {
    console.log(chalk.bold.hex('#6D28D9')(title));
  },

  fileModified: (file: string) =>
    console.log(chalk.yellow('  ~ ') + chalk.white(file)),

  fileAdded: (file: string) =>
    console.log(chalk.green('  + ') + chalk.white(file)),

  fileDeleted: (file: string) =>
    console.log(chalk.red('  - ') + chalk.white(file)),

  fileRenamed: (file: string) =>
    console.log(chalk.blue('  → ') + chalk.white(file)),

  fileUntracked: (file: string) =>
    console.log(chalk.magenta('  ? ') + chalk.white(file)),
};
