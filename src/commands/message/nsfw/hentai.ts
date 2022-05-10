import axios from 'axios';
import { MessageEmbed } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'hentai',
    description: 'NSFW command, with NO information.',
    nsfwChannelRequired: true,
  },
  run: async ({ message }) => {
    const embed = new MessageEmbed();

    try {
      const url1 = 'https://nekobot.xyz/api/image';

      const response = await axios.get(url1, { params: { type: 'hentai' } });
      const responseData = response.data;

      interface MemeResponse {
        message: string;
        success: boolean;
      }

      const data: MemeResponse = responseData[0];

      embed.setTitle('Hentai here').setImage(data.message);

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
