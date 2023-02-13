import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'shortenurl',
    description: "Fetch meme's image.",
    directMessageAllowed: true,
    cooldownInterval: 6 * 1000,
  },
  run: async ({ message, args }) => {
    const embed = new EmbedBuilder();

    const destination = args[0];

    try {
      const url = `https://is.gd/create.php?format=simple&url=${encodeURI(
        destination,
      )}`;

      const response = await axios.get(url);
      const responseData: string = response.data;

      embed
        .setTitle('Converted!')
        .setDescription(
          `URL: ${responseData}\nDestination: \`${destination}\``,
        );

      await message.reply({
        embeds: [embed],
      });
    } catch {
      embed.setDescription('Error occured when fetching the content.');

      await message.reply({
        embeds: [embed],
      });
    }
  },
};
