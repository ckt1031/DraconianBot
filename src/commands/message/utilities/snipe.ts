import { MessageEmbed } from 'discord.js';

import { snipeDatabase } from '../../../utils/database';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'snipe',
    aliases: ['s'],
    description: 'Snipe deleted message in current channel.',
  },
  run: async ({ message }) => {
    const channelId = message.channelId;

    const database = snipeDatabase.get(channelId);

    if (!snipeDatabase.has(channelId) || !database) {
      message.reply({
        content: "This channel doesn't contain any **deleted** messages.",
      });
      return;
    }

    const embed = new MessageEmbed().setAuthor({
      name: database.author.name ?? 'N/A',
    });

    if (database.content.text) embed.setDescription(database.content.text);
    if (database.content.imageURL) embed.setImage(database.content.imageURL);

    message.reply({
      embeds: [embed],
    });
  },
};
