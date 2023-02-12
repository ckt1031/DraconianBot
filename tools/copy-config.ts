import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import chalk from 'chalk';
import glob from 'glob';
import path from 'path';
import { fileURLToPath } from 'url';
import deepmerge from 'deepmerge';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let folderPath = join(__dirname, '../config/*.example.json');

// Parse path in windows
if (process.platform === 'win32') {
  folderPath = folderPath.replaceAll('\\', '/');
}

glob(folderPath, (error, allFiles) => {
  if (error) throw error;

  for (let index = 0, l = allFiles.length; index < l; index++) {
    const filePath = allFiles[index];

    // Path that used in code, user specified config path
    const targetPath = filePath.replace('.example', '');

    // The example config file
    const defaultConfigFile = readFileSync(filePath);
    const defaultConfig = JSON.parse(defaultConfigFile as unknown as string);

    // If file exist, merge it
    if (existsSync(targetPath)) {
      // User specified config file
      const oldConfigFile = readFileSync(targetPath);
      const oldConfig = JSON.parse(oldConfigFile as unknown as string);

      // Merged config
      const newConfig = deepmerge(defaultConfig, oldConfig);

      console.log(chalk.yellow('📀 MERGE SUCCEED:') + ` ${targetPath}`);

      writeFileSync(targetPath, JSON.stringify(newConfig, null, 2));

      continue;
    }

    console.log(chalk.green('✅ COPY SUCCEED:') + ` ${targetPath}`);

    // If file not exist, copy it
    copyFileSync(filePath, targetPath);
  }
});
