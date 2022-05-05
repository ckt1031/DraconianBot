import {
  guildConfiguration,
  snipeDatabase,
  ensureSnipeChannel,
  ensureServerData,
} from '../../utils/database';

import type { Message } from 'discord.js';
import type { Event } from '../../sturctures/event';

export const event: Event = {
  name: 'messageCreate',
  run: async (_, message: Message) => {
    if (message.partial) {
      await message.fetch();
    }

    const { guild, channelId, content, attachments, author } = message;

    if (guild) {
      const config = guildConfiguration.get(guild.id);

      ensureServerData(guild.id);

      if (!config?.snipe.channelDisabled.includes(channelId)) {
        if (message.client.user?.id !== message.author.id) {
          ensureSnipeChannel(channelId);

          snipeDatabase.set(channelId, {
            author: {
              id: author.id,
              name: author.tag,
            },
            content: {
              text: content,
              date: Date.now(),
              imageURL: attachments.first()
                ? attachments.first()?.proxyURL
                : null,
            },
          });
        }
      }
    }
  },
};
