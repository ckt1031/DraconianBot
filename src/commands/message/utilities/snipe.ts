import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';
import { snipeDatabase } from '../../../utils/database';

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

    for (let index_ = 0; index_ < 2; index_++) {
      if (!snipeData) snipeData = database.data[0];
      if (index_ !== 0 && !snipeData) return;
    }

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
