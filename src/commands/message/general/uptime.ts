import { EmbedBuilder } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';
import { parseMsToVisibleText } from '../../../utils/formatters';

export const command: TextCommand = {
  data: {
    name: 'uptime',
    description: 'Check Bot uptime duration.',
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const instanceBoot = message.client.uptime!;
    const bootTimeMS = Math.round((Date.now() - instanceBoot) / 1000);

    const embed = new EmbedBuilder()
      .setTitle("Bot's Uptime")
      .setDescription(
        `\`${parseMsToVisibleText(
          instanceBoot,
        )}\`\n**Booted at** <t:${bootTimeMS}>`,
      );

    message.reply({
      embeds: [embed],
    });
  },
};
