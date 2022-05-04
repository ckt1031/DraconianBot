import { MessageEmbed } from 'discord.js';

import type { SlashCommand } from '../../sturctures/command';

const slash: SlashCommand = {
  data: {
    name: 'ping',
    description: 'Check network delay.',
  },
  run: async ({ interaction }) => {
    const ms = Math.round(interaction.client.ws.ping);
    const delay = Date.now() - interaction.createdTimestamp;

    const embed = new MessageEmbed().setDescription(
      `Action Delay: \`${delay}ms\`\nAPI Delay: \`${ms}ms\``,
    );

    interaction.reply({
      embeds: [embed],
    });
  },
};

export default slash;
