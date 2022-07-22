import type { Message } from 'discord.js';

import type { DiscordEvent } from '../../sturctures/event';
import Server from '../../models/server';
import Snipe from '../../models/snipe';

export const event: DiscordEvent = {
  name: 'messageDelete',
  run: async (message: Message) => {
    const { guild, channel, content, attachments, author, client } = message;

    const condition = channel.isThread() || channel.isTextBased();

    if (guild && condition) {
      const config = await Server.findOne({
        serverId: guild.id,
      });

      // Validate whether it can be stored into Sniping system.
      if (
        !config?.snipe.channelDisabled.includes(channel.id) &&
        client.user?.id !== author.id
      ) {
        const snipes = Snipe.findOne({
          channelId: channel.id,
        });

        const modelData = snipes ?? { data: [] };

        if (!modelData.data) {
          modelData.data = [];
        }

        const snipe = {
          author: {
            id: author.id,
            name: author.tag,
          },
          content: {
            text: content,
            date: Date.now(),
            imageURL: attachments.first()?.proxyURL,
          },
        };

        modelData.data.unshift(snipe);

        if (modelData.data.length >= 4) {
          modelData.data.pop();
        }

        // Set to database.
        snipeDatabase.set(channel.id, modelData);
      }
    }
  },
};
