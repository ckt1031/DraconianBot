import { MessageEmbed } from 'discord.js';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'ping',
    description: "Check Bot's network delay.",
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const embed = new MessageEmbed().setDescription(
      `Action Delay: \`${
        Date.now() - message.createdTimestamp
      }ms\`\nAPI Delay: \`${Math.round(message.client.ws.ping)}ms\``,
    );

    message.reply({
      embeds: [embed],
    });
  },
};
