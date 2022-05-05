import { MessageEmbed } from 'discord.js';

import type { SlashCommand } from '../../sturctures/command';

export const command: SlashCommand = {
  data: {
    name: 'ping',
    type: 'CHAT_INPUT',
    description: 'Check network delay.',
  },
  run: async ({ interaction }) => {
    const apiDelayMS = Math.round(interaction.client.ws.ping);
    const messageDelayMS = Date.now() - interaction.createdTimestamp;

    const embed = new MessageEmbed().setDescription(
      `Action Delay: \`${messageDelayMS}ms\`\nAPI Delay: \`${apiDelayMS}ms\``,
    );

    interaction.reply({
      embeds: [embed],
    });
  },
};
