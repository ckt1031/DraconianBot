import { MessageEmbed } from 'discord.js';

import { name as botname } from '../../../../config/bot.json';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'help',
    description: 'Get information or help from the bot.',
    directMessageAllowed: true,
  },
  run: async ({ message }) => {
    const embed = new MessageEmbed();
    const commandsCatagories = message.client.commandsCatagories;

    for (const catagory of commandsCatagories) {
      const text = catagory[1].map(i => `\`${i}\``).join(', ');
      embed.addField(catagory[0], text);
    }

    const avatarURL = message.client.user?.defaultAvatarURL;

    if (avatarURL) {
      embed.setTitle('Bot Assistance Centre').setFooter({
        text: `© ${new Date().getFullYear()} ${botname}`,
        iconURL: avatarURL,
      });
    }

    message.reply({
      embeds: [embed],
    });
  },
};
