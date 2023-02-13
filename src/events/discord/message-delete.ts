import type { Message } from 'discord.js';

import Snipe from '../../models/snipe';
import type { DiscordEvent } from '../../sturctures/event';
import { getServerData } from '../../utils/database';

export const event: DiscordEvent = {
  name: 'messageDelete',
  run: async (message: Message) => {
    const { guild, channel, content, attachments, author, client } = message;

    const condition = channel.isThread() || channel.isTextBased();

    if (guild && condition) {
      const config = await getServerData(guild.id);

      if (!config.snipe.channelDisabled.includes(channel.id) && client.user.id !== author.id) {
        const snipes = await Snipe.findOne({
          channelId: channel.id,
        });

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

        if (snipes) {
          await Snipe.findOneAndUpdate(
            { channelId: channel.id },
            {
              $set: {
                ...snipe,
              },
            },
          );
        } else {
          const nSnipe = new Snipe({
            channelId: channel.id,
            ...snipe,
          });
          await nSnipe.save();
        }
      }
    }
  },
};
