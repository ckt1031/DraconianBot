import { MessageEmbed } from 'discord.js';

import type { SlashCommand } from '../../sturctures/command';

const slash: SlashCommand = {
  data: {
    name: 'ping',
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

export default slash;
