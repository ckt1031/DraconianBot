import { EmbedBuilder } from 'discord.js';

import { snipeDatabase } from '../../../utils/database';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'snipe',
    aliases: ['s'],
    description: 'Snipe deleted message in current channel.',
    requiredArgs: [
      {
        name: 'index',
        type: 'NUMBER',
        required: false,
      },
    ],
  },
  run: async ({ message, args }) => {
    const channelId = message.channelId;

    const database = snipeDatabase.get(channelId);

    if (!snipeDatabase.has(channelId) || !database) {
      message.reply({
        content: "This channel doesn't contain any **deleted** messages.",
      });
      return;
    }

    let index = 0;

    const argumentNumebr = Number(args[0]);

    if (argumentNumebr || argumentNumebr > 0 || argumentNumebr < 2) {
      index = argumentNumebr;
    }

    let snipeData = database.data[index];

    if (!snipeData) snipeData = database.data[0];

    const embed = new EmbedBuilder().setAuthor({
      name: snipeData.author.name ?? 'N/A',
    });

    if (snipeData.content.text) embed.setDescription(snipeData.content.text);
    if (snipeData.content.imageURL) embed.setImage(snipeData.content.imageURL);

    message.reply({
      embeds: [embed],
    });
  },
};
