import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'cat',
    description: 'Fetch cat image.',
    directMessageAllowed: true,
    cooldownInterval: 6 * 1000,
  },
  run: async ({ message }) => {
    const embed = new EmbedBuilder();

    const url = 'https://api.thecatapi.com/v1/images/search?format=json';

    try {
      const response = await axios.get(url);
      const responseData = response.data;

      const data: {
        id: string;
        url: string;
      } = responseData[0];

      embed
        .setTitle('Cat here')
        .setImage(data.url)
        .setFooter({
          text: `ID: ${data.id}`,
        });

      message.reply({
        embeds: [embed],
      });
    } catch {
      embed.setDescription('Error occured when fetching meme content.');

      message.reply({
        embeds: [embed],
      });
    }
  },
};
