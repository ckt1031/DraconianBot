import axios from 'axios';
import type { TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'pussy',
    description: 'NSFW command, with NO information.',
    nsfwChannelRequired: true,
  },
  run: async ({ message }) => {
    if (!(message.channel as TextChannel).nsfw) return;

    const embed = new EmbedBuilder();

    try {
      const url = 'https://nekobot.xyz/api/image';

      const response = await axios.get(url, { params: { type: 'pussy' } });
      const responseData = response.data;

      const data: {
        message: string;
        success: boolean;
      } = responseData[0];

      embed.setTitle('Pussy here').setImage(data.message);

      await message.reply({
        embeds: [embed],
      });
    } catch {
      embed.setDescription('Error occured when fetching meme content.');

      await message.reply({
        embeds: [embed],
      });
    }
  },
};
