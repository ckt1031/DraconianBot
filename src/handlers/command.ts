import { join } from 'node:path';

import glob from 'glob';

import type { Client } from 'discord.js';

export default async (client: Client) => {
  // eslint-disable-next-line unicorn/prefer-module
  const commandsFolder = join(__dirname, '../commands/**/*');
  glob(commandsFolder, (error, allFiles) => {
    if (error) throw error;
    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];

      if (filePath.endsWith('.js')) {
        // eslint-disable-next-line unicorn/prefer-module
        const command = require(filePath);
        client.commands.set(command.name, command);
        if (command.aliases) {
          for (const alias of command.aliases) {
            client.aliases.set(alias, command.name);
          }
        }
        // eslint-disable-next-line unicorn/prefer-module
        delete require.cache[require.resolve(filePath)];
      }
    }
  });
};
