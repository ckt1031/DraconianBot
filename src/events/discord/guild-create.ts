import { ensureServerData } from '../../utils/database';

import type { Guild } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  name: 'guildCreate',
  run: async (guild: Guild) => {
    ensureServerData(guild.id);
  },
};
