import glob from 'glob';
import chalk from 'chalk';

import { join } from 'node:path';
import { copyFileSync, existsSync } from 'node:fs';

let folderPath = join(__dirname, '../config/*.example.json');

// Parse path in windows
if (process.platform === 'win32') {
  folderPath = folderPath.replaceAll('\\', '/');
}

glob(folderPath, (error, allFiles) => {
  if (error) throw error;

  for (let index = 0, l = allFiles.length; index < l; index++) {
    const filePath = allFiles[index];
    if (!existsSync(filePath)) {
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
