import glob from 'glob';
import { join } from 'node:path';

import type { Client } from 'discord.js';
import type { TextCommand } from '../sturctures/command';

export default async (client: Client) => {
  const commandsFolder = join(__dirname, '../commands/message/**/*.js');
  const folderPath = commandsFolder.replaceAll('\\', '/');

  glob(folderPath, (error, allFiles) => {
    if (error) throw error;
    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];
      const commandFile = require(filePath);
      const command: TextCommand = commandFile.command;
      // Store command to memory.
      client.commands.set(command.data.name, command);
      if (command.data.aliases) {
        for (const alias of command.data.aliases) {
          // Store aliase(s) to memory if exists.
          client.aliases.set(alias, command.data.name);
        }
      }
      delete require.cache[require.resolve(filePath)];
    }
  });
};
