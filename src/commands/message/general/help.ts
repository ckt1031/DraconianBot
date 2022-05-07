import { MessageEmbed } from 'discord.js';

import { callbackEmbed } from '../../../utils/messages';
import { getCommandHelpInfo } from '../../../utils/cmds';

import { name as botname, githubLink } from '../../../../config/bot.json';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'help',
    description: 'Get information or help from the bot.',
    directMessageAllowed: true,
  },
  run: async ({ message, args }) => {
    const embed = new MessageEmbed();

    if (!args[0]) {
      const commandsCatagories = message.client.commandsCatagories;

      embed.setDescription(
        `Hello🙋‍♂️!\nOur source code: [Here](${githubLink})\nTurely appreciate that yuo are supporting us.`,
      );

      for (const catagory of commandsCatagories) {
        const text = catagory[1].map(index => `\`${index}\``).join(', ');
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
    } else {
      let cmd: TextCommand | undefined;
      const commandMatching = message.client.commands.get(args[0]);
      const aliasesMatching = message.client.aliases.get(args[0]);
      // Fetch command destination.
      if (commandMatching) {
        cmd = commandMatching;
      } else if (aliasesMatching) {
        cmd = message.client.commands.get(aliasesMatching);
      } else {
        return callbackEmbed({
          message,
          text: 'Command requested does not exist!',
          color: 'RED',
          mode: 'error',
        });
      }

      if (cmd) getCommandHelpInfo(message, cmd);
    }
  },
};
