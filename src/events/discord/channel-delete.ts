import type { Channel, TextChannel } from 'discord.js';

import Snipe from '../../models/snipe';
import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  name: 'channelDelete',
  run: async (channel: Channel) => {
    if (channel.isTextBased()) {
      const textChannel = channel as TextChannel;

      const snipeData = Snipe.findOne({
        channelId: textChannel.id,
      });

      if (snipeData) {
        snipeData.deleteOne();
      }
    }
  },
};
