import fs from 'node:fs';
import glob from 'glob';

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
    fs.copyFileSync(filePath, filePath.replace('.example', ''));
  }
});
