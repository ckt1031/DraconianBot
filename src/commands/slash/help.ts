import { MessageEmbed } from 'discord.js';

import { command as TextCommand } from '../message/general/help';

import { name as botname } from '../../../config/bot.json';

import type { SlashCommand } from '../../sturctures/command';

export const command: SlashCommand = {
  data: {
    name: 'help',
    type: 'CHAT_INPUT',
    description: TextCommand.data.description,
  },
  run: async ({ interaction }) => {
    const embed = new MessageEmbed();
    const commandsCatagories = interaction.client.commandsCatagories;

    for (const catagory of commandsCatagories) {
      const text = catagory[1].map(index => `\`${index}\``).join(', ');
      embed.addField(catagory[0], text);
    }

    const avatarURL = interaction.client.user?.defaultAvatarURL;

    if (avatarURL) {
      embed.setTitle('Bot Assistance Centre').setFooter({
        text: `© ${new Date().getFullYear()} ${botname}`,
        iconURL: avatarURL,
      });
    }

    interaction.reply({
      embeds: [embed],
    });
  },
};
