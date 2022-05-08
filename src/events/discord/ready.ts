import { ensureServerData } from '../../utils/database';
import { loadSlashCommand } from '../../loaders/command';

import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  once: true,
  name: 'ready',
  run: async client => {
    // Load slash command.
    loadSlashCommand(client);

    // Ensure all server data is synced and unified.
    const guilds = client.guilds.cache.map(guild => guild.id);
    for (const guildId of guilds) ensureServerData(guildId);

    console.log('Bot is in ready status!');
  },
};
