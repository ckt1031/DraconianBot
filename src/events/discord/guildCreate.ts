import { ensureServerData } from '../../utils/database';

import type { Guild } from 'discord.js';
import type { Event } from '../../sturctures/event';

export const event: Event = {
  name: 'guildCreate',
  run: async (_, guild: Guild) => {
    ensureServerData(guild.id);
  },
};
