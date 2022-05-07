import {
  guildConfiguration,
  snipeDatabase,
  ensureSnipeChannel,
  ensureServerData,
} from '../../utils/database';

import type { Message } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  name: 'messageDelete',
  run: async (_, message: Message) => {
    if (message.partial) {
      await message.fetch();
    }

    const { guild, channelId, content, attachments, author, client } = message;

    if (guild) {
      const config = guildConfiguration.get(guild.id);

      ensureServerData(guild.id);

      if (
        !config?.snipe.channelDisabled.includes(channelId) &&
        client.user?.id !== author.id
      ) {
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
              : undefined,
          },
        });
      }
    }
  },
};
