import { EmbedBuilder } from 'discord.js';

import Snipe from '../../../models/snipe';
import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'snipe',
    aliases: ['s'],
    description: 'Snipe deleted message in current channel.',
  },
  run: async ({ message }) => {
    const channelId = message.channelId;

    const snipeData = await Snipe.findOne({ channelId });

    if (!snipeData) {
      await message.reply({
        content: "This channel doesn't contain any **deleted** messages.",
      });
      return;
    }

    const embed = new EmbedBuilder().setAuthor({
      name: snipeData.author.name,
    });

    if (snipeData.content.text) embed.setDescription(snipeData.content.text);
    if (snipeData.content.imageURL) embed.setImage(snipeData.content.imageURL);

    await message.reply({
      embeds: [embed],
    });
  },
};
