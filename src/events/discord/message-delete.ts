import type { Message } from 'discord.js';

import Server from '../../models/server';
import Snipe from '../../models/snipe';
import type { DiscordEvent } from '../../sturctures/event';

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
        config &&
        !config?.snipe.channelDisabled.includes(channel.id) &&
        client.user?.id !== author.id
      ) {
        const filter = { channelId: channel.id };
        const snipes = Snipe.findOne({
          ...filter,
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

        if (!snipes) {
          const nSnipe = new Snipe({
            ...filter,
            ...snipe,
          });
          await nSnipe.save().catch(() => {});
        } else {
          await Snipe.updateOne(
            { ...filter },
            {
              $set: {
                ...snipe,
              },
            },
          );
        }
      }
    }
  },
};
