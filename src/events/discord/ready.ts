import type { Client } from 'discord.js';
import { ActivityType } from 'discord.js';

import { defaultPrefix } from '../../../config/bot.json';
import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  once: true,
  name: 'ready',
  run: (client: Client) => {
    // Dynamic Status
    let index = 0;

    const status = [`${client.guilds.cache.size} Servers`];

    setInterval(() => {
      const _status = status[index++ % status.length];
      const text = `${defaultPrefix}help | ${_status}`;
      client.user?.setActivity(text, {
        type: ActivityType.Watching,
      });
    }, 15 * 1000);

    console.log('Bot is in ready status!');
  },
};
