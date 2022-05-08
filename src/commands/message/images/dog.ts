import axios from 'axios';
import { MessageEmbed } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'dog',
    description: 'Fetch dog image.',
    directMessageAllowed: true,
    cooldownInterval: 6 * 1000,
  },
  run: async ({ message }) => {
    const embed = new MessageEmbed();

    try {
      interface MemeResponse {
        message: string;
        status: string;
      }

      const url1 = 'https://dog.ceo/api/breeds/image/random';

      const response = await axios.get(url1);
      const responseData: MemeResponse = response.data;

      if (responseData.status !== 'success') throw '';

      embed.setTitle('Dog here').setImage(responseData.message);

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
