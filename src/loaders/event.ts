import { join } from 'node:path';

import type { Client } from 'discord.js';
import glob from 'glob';

import type { DiscordEvent } from '../sturctures/event';

export function loadDiscordEvent(client: Client) {
  let folderPath = join(__dirname, '../events/discord/**/*.js');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  glob(folderPath, async (error, allFiles) => {
    if (error) throw error;

    if (allFiles.length === 0) {
      return;
    }

    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[Number(index)];

      // Get event content.
      const eventFile = (await import(filePath)).default;
      const event: DiscordEvent = eventFile.event;

      // Check triggering mode.
      if (event.once === true) {
        // eslint-disable-next-line unicorn/no-useless-undefined
        client.once(event.name, event.run.bind(undefined));
      } else {
        // eslint-disable-next-line unicorn/no-useless-undefined
        client.on(event.name, event.run.bind(undefined));
      }
      // Remove cache.
      delete require.cache[require.resolve(filePath)];
    }
  });
}
