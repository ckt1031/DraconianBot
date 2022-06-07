import chalk from 'chalk';
import glob from 'glob';
import { copyFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

let folderPath = join(__dirname, '../config/*.example.json');

// Parse path in windows
if (process.platform === 'win32') {
  folderPath = folderPath.replaceAll('\\', '/');
}

glob(folderPath, (error, allFiles) => {
  if (error) throw error;

  for (let index = 0, l = allFiles.length; index < l; index++) {
    const filePath = allFiles[index];
    if (!existsSync(filePath.replace('.example', ''))) {
      copyFileSync(filePath, filePath.replace('.example', ''));
      console.log(chalk.green('COPY SUCCEED:') + ` ${filePath}`);
    } else {
      console.log(
        chalk.red('COPY FAILED:') +
          ` ${filePath} - Consider manually copy new updated option to old one.`,
      );
    }
  }
});
