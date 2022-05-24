import { guildConfiguration } from '../../utils/database';

import type { ThreadChannel } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  name: 'threadDelete',
  run: async (_, thread: ThreadChannel) => {
    if (guildConfiguration.has(thread.id)) {
      guildConfiguration.delete(thread.id);
    }
  },
};
