import { snipeDatabase } from '../../utils/database';

import type { Channel } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  name: 'channelDelete',
  run: async (_, channel: Channel) => {
    if (channel.isText()) {
      if (snipeDatabase.has(channel.id)) {
        snipeDatabase.delete(channel.id);
      }
      if (channel.name.startsWith('ticket-')) {
        // TODO: Ticket System
      }
    }
  },
};
