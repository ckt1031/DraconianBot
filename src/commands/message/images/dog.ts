import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'dog',
    description: 'Fetch dog image.',
    directMessageAllowed: true,
    cooldownInterval: 6 * 1000,
  },
  run: async ({ message }) => {
    const embed = new EmbedBuilder();

    const url = 'https://dog.ceo/api/breeds/image/random';

    try {
      const response = await axios.get(url);
      const responseData: {
        status: string;
        message: string;
      } = response.data;

      if (responseData.status === 'success') {
        embed.setTitle('Dog here').setImage(responseData.message);

        await message.reply({
          embeds: [embed],
        });
      }
    } catch {
      embed.setDescription('Error occured when fetching meme content.');

      await message.reply({
        embeds: [embed],
      });
    }
  },
};
