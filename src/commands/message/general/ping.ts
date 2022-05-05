import { MessageEmbed } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'ping',
    description: "Check Bot's network delay.",
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const apiDelayMS = Math.round(message.client.ws.ping);
    const messageDelayMS = Date.now() - message.createdTimestamp;

    const embed = new MessageEmbed().setDescription(
      `Action Delay: \`${messageDelayMS}ms\`\nAPI Delay: \`${apiDelayMS}ms\``,
    );

    message.reply({
      embeds: [embed],
    });
  },
};
