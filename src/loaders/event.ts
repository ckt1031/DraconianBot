import glob from 'glob';
import chalk from 'chalk';
import { join } from 'node:path';

import type { Client } from 'discord.js';
import type { DiscordEvent, DistubeEvent } from '../sturctures/event';

export async function loadDiscordEvent(client: Client) {
  let folderPath = join(__dirname, '../events/discord/**/*.js');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  glob(folderPath, (error, allFiles) => {
    if (error) throw error;

    if (allFiles.length === 0) {
      console.log(
        chalk.blueBright.bold(
          '\nWARNING: Cannot find any possible event target.\n',
        ),
      );
    }

    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];

      // Get event content.
      const eventFile = require(filePath);
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

export async function loadMusicEvent(client: Client) {
  let folderPath = join(__dirname, '../events/distube/**/*.js');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  glob(folderPath, (error, allFiles) => {
    if (error) throw error;
    if (allFiles.length === 0) {
      console.log(
        chalk.blueBright.bold(
          '\nWARNING: Cannot find any possible music event target.\n',
        ),
      );
    }

    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];

      // Get event content.
      const eventFile = require(filePath);
      const event: DistubeEvent = eventFile.event;

      // Check triggering mode.
      client.distube.on(event.name, event.run.bind(undefined, client));

      // Remove cache.
      delete require.cache[require.resolve(filePath)];
    }
  });
}
