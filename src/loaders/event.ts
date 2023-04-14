import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import chalk from 'chalk';
import type { Client } from 'discord.js';
import glob from 'glob';

import type { DiscordEvent } from '../sturctures/event';

const __dirname = dirname(fileURLToPath(import.meta.url));

export async function loadDiscordEvent(client: Client) {
  let folderPath = join(__dirname, '../events/discord/**/*.ts');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  const allFiles = await glob(folderPath);

  if (allFiles.length === 0) {
    return;
  }

  for (const filePath of allFiles) {
    // Get event content.
    const eventFile = await import(filePath);
    const event: DiscordEvent = eventFile.event;

    // Check triggering mode.
    if (event.once === true) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      client.once(event.name, event.run.bind(undefined));
    } else {
      // eslint-disable-next-line unicorn/no-useless-undefined
      client.on(event.name, event.run.bind(undefined));
    }
  }

  // Print number of loaded events.
  console.log(chalk.greenBright.bold(`Loaded ${allFiles.length} Discord events.`));
}
