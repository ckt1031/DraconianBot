import type { Channel, TextChannel } from 'discord.js';

import type { DiscordEvent } from '../../sturctures/event';
import Snipe from '../../models/snipe';

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
