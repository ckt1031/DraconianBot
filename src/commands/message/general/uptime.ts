import { MessageEmbed } from 'discord.js';

import { parseMsToVisibleText } from '../../../utils/formatters';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'uptime',
    description: 'Check Bot uptime duration.',
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const instanceBoot = message.client.uptime ?? 0;
    const bootTimeMS = Math.round((Date.now() - instanceBoot) / 1000);

    const embed = new MessageEmbed()
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
