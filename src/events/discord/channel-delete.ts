import type { Channel, TextChannel } from 'discord.js';

import type { DiscordEvent } from '../../sturctures/event';
import { snipeDatabase } from '../../utils/database';

export const event: DiscordEvent = {
  name: 'channelDelete',
  run: async (channel: Channel) => {
    if (channel.isTextBased()) {
      const textChanne = channel as TextChannel;
      if (snipeDatabase.has(textChanne.id)) {
        snipeDatabase.delete(textChanne.id);
      }
      if (textChanne.name.startsWith('ticket-')) {
        // TODO: Ticket System
      }
    }
  },
};
