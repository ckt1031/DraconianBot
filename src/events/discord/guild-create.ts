import type { Guild } from 'discord.js';

import type { DiscordEvent } from '../../sturctures/event';
import { getServerData } from '../../utils/database';

export const event: DiscordEvent = {
  name: 'guildCreate',
  run: async (guild: Guild) => {
    getServerData(guild.id);
  },
};
