import { ActivityType } from 'discord.js';
import type { Client, Guild } from 'discord.js';

import { defaultPrefix } from '../../../config/bot.json';
import type { DiscordEvent } from '../../sturctures/event';
import { getServerData } from '../../utils/database';

export const event: DiscordEvent = {
  once: true,
  name: 'ready',
  run: async (client: Client) => {
    // Ensure all server data is synced and unified when booted.
    const guilds = client.guilds.cache.map((guild: Guild) => guild.id);
    for (const guildId of guilds) getServerData(guildId);

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
