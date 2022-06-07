import type { ThreadChannel } from 'discord.js';

import type { DiscordEvent } from '../../sturctures/event';
import { snipeDatabase } from '../../utils/database';

export const event: DiscordEvent = {
  name: 'threadDelete',
  run: async (thread: ThreadChannel) => {
    if (snipeDatabase.has(thread.id)) {
      snipeDatabase.delete(thread.id);
    }
  },
};
