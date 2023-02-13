import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';
import deepmerge from 'deepmerge';
import glob from 'glob';

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
    const filePath = allFiles[Number(index)];

    // Path that used in code, user specified config path
    const targetPath = filePath.replace('.example', '');
    const tagretFileName = path.basename(targetPath);

    // The example config file
    const defaultConfigFile = readFileSync(filePath);
    const defaultConfig: object = JSON.parse(
      defaultConfigFile as unknown as string,
    );

    // If file exist, merge it
    if (existsSync(targetPath)) {
      // User specified config file
      const oldConfigFile = readFileSync(targetPath);
      const oldConfig: object = JSON.parse(oldConfigFile as unknown as string);

      // Merged config
      const newConfig = deepmerge(defaultConfig, oldConfig);

      console.log(chalk.yellow('📀 MERGE SUCCEED:' + ` ${tagretFileName}`));

      writeFileSync(targetPath, JSON.stringify(newConfig, null, 2));

      continue;
    }

    console.log(chalk.green('✅ COPY SUCCEED:' + ` ${tagretFileName}`));

    // If file not exist, copy it
    copyFileSync(filePath, targetPath);
  }
});
