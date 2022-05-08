import axios from 'axios';
import { MessageEmbed } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'cat',
    description: 'Fetch cat image.',
    directMessageAllowed: true,
    cooldownInterval: 6 * 1000,
  },
  run: async ({ message }) => {
    const embed = new MessageEmbed();

    try {
      const url1 = 'https://api.thecatapi.com/v1/images/search?format=json';

      const response = await axios.get(url1);
      const responseData = response.data;

      interface MemeResponse {
        url: string;
        id: string;
      }

      const data: MemeResponse = responseData[0];

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
