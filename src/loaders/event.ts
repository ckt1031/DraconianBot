import glob from 'glob';
import chalk from 'chalk';
import { join } from 'node:path';

import type { Client } from 'discord.js';
import type { Event } from '../sturctures/event';

export default async (client: Client) => {
  let folderPath = join(__dirname, '../events/discord/**/*.js');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  glob(folderPath, (error, allFiles) => {
    if (error) throw error;
    if (allFiles.length === 0) {
      console.log(
        chalk.blueBright.bold('\nWARNING: Cannot find any possible event target.\n'),
      );
    }
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
