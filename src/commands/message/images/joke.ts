import axios from 'axios';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'joke',
    description: 'Get some jokes.',
    directMessageAllowed: true,
    cooldownInterval: 6 * 1000,
  },
  run: async ({ message }) => {
    const embed = new EmbedBuilder();

    const url = 'https://v2.jokeapi.dev/joke/Any?type=single';

    try {
      const response = await axios.get(url);
      const responseData: {
        id: string;
        joke: string;
        error: boolean;
        category: string;
      } = response.data;

      if (responseData.error) throw 0;

      embed.setTitle(responseData.joke).setFooter({
        text: `Category: ${responseData.category} • ID: ${responseData.id}`,
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
