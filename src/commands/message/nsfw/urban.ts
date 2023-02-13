import type { TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';
import { define } from 'urban-dictionary';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'urban',
    description: 'Fetch Urban Dictionary.',
    nsfwChannelRequired: true,
    requiredArgs: [
      {
        name: 'duration',
        type: 'STRING',
        rest: true,
      },
    ],
  },
  run: async ({ message, args }) => {
    if (!(message.channel as TextChannel).nsfw) return;

    const embed = new EmbedBuilder();

    const searchQuery = args.join(' ');

    try {
      const result = await define(searchQuery);

      embed.setTitle(`Dictionary:${result[0].word}`).setFields([
        {
          name: 'Definition',
          value: `\`\`\`${result[0].definition}\`\`\``,
        },
        {
          name: 'Example',
          value: `\`\`\`${result[0].example}\`\`\``,
        },
        {
          name: 'Author',
          value: result[0].author,
          inline: true,
        },
        {
          name: 'Up',
          value: result[0].thumbs_up.toString(),
          inline: true,
        },
        {
          name: 'Down',
          value: result[0].thumbs_down.toString(),
          inline: true,
        },
      ]);

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
