import type { Guild } from 'discord.js';

import type { DiscordEvent } from '../../sturctures/event';
import { ensureServerData } from '../../utils/database';

export const event: DiscordEvent = {
  name: 'guildCreate',
  run: async (guild: Guild) => {
    ensureServerData(guild.id);
  },
};
