import { ensureServerData } from '../../utils/database';

import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  once: true,
  name: 'ready',
  run: async client => {
    // Ensure all server data is synced and unified when booted.
    const guilds = client.guilds.cache.map(guild => guild.id);
    for (const guildId of guilds) ensureServerData(guildId);

    console.log('Bot is in ready status!');
  },
};
