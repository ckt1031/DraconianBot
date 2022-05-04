import glob from 'glob';
import { join } from 'node:path';

import type { Client } from 'discord.js';
import type { Event } from '../sturctures/event';

export default async (client: Client) => {
  const eventsFolder = join(__dirname, '../events/discord/*.js');
  const folderPath = eventsFolder.replaceAll('\\', '/');

  glob(folderPath, (error, allFiles) => {
    if (error) throw error;
    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];
      // Get event content.
      const eventFile = require(filePath);
      const event: Event = eventFile.event;
      // Check triggering mode.
      if (event.once === true) {
        client.once(event.name, event.run.bind(undefined, client));
      } else {
        client.on(event.name, event.run.bind(undefined, client));
      }
      // Remove cache.
      delete require.cache[require.resolve(filePath)];
    }
  });
};
