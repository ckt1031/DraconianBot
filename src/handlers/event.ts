import { parse, join } from 'node:path';

import glob from 'glob';

import type { Client } from 'discord.js';

export default async (client: Client) => {
  // eslint-disable-next-line unicorn/prefer-module
  const eventsFolder = join(__dirname, '../events/discord/*');

  glob(eventsFolder, (error, allFiles) => {
    if (error) throw error;
    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];
      if (filePath.endsWith('.js')) {
        type eventType = {
          once?: boolean;
          (): any;
        };

        // eslint-disable-next-line unicorn/prefer-module
        const event: eventType = require(filePath);
        const fileName = parse(filePath).name;

        if (event.once === true) {
          client.once(fileName, event.bind(undefined, client));
        } else {
          client.on(fileName, event.bind(undefined, client));
        }

        // eslint-disable-next-line unicorn/prefer-module
        delete require.cache[require.resolve(filePath)];
      }
    }
  });
};
