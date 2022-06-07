import { ActivityType } from 'discord.js';
import type { Client, Guild } from 'discord.js';

import { defaultPrefix } from '../../../config/bot.json';
import type { DiscordEvent } from '../../sturctures/event';
import { ensureServerData } from '../../utils/database';

export const event: DiscordEvent = {
  once: true,
  name: 'ready',
  run: async (client: Client) => {
    // Ensure all server data is synced and unified when booted.
    const guilds = client.guilds.cache.map((guild: Guild) => guild.id);
    for (const guildId of guilds) ensureServerData(guildId);

    // Dynamic Status
    let index = 0;
    const status = [
      `${client.guilds.cache.size} Servers`,
      `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
    ];

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
