import glob from 'glob';
import chalk from 'chalk';
import { join } from 'node:path';

import type { Client } from 'discord.js';
import type { TextCommand } from '../sturctures/command';

export default async (client: Client) => {
  let folderPath = join(__dirname, '../commands/message/**/*.js');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  glob(folderPath, (error, allFiles) => {
    if (error) throw error;
    if (allFiles.length === 0) {
      console.log(
        chalk.bold('\nWARNING: Cannot find any possible command target.\n'),
      );
    }
    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];
      const commandFile = require(filePath);
      const command: TextCommand = commandFile.command;
      // Store command to memory.
      const cmdName = command.data.name;
      if (client.commands.has(cmdName)) {
        throw 'Duplicated command is found!';
      }
      // command.data.catagory = '';
      client.commands.set(cmdName, command);
      if (command.data.aliases) {
        for (const alias of command.data.aliases) {
          if (client.aliases.has(alias)) {
            throw 'Duplicated command alias is found!';
          }
          // Store aliase(s) to memory if exists.
          client.aliases.set(alias, command.data.name);
        }
      }
      delete require.cache[require.resolve(filePath)];
    }
  });
};
