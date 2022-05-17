import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

import { getCommandHelpInfo } from '../../utils/cmds';
import { callbackEmbed } from '../../utils/messages';
import { command as helpTextCommand } from '../message/general/help';

import { name as botname, githubLink } from '../../../config/bot.json';

import type { TextChannel } from 'discord.js';
import type { TextCommand, SlashCommand } from '../../sturctures/command';

export const command: SlashCommand = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription(helpTextCommand.data.description)
    .addStringOption(option =>
      option
        .setName('command')
        .setDescription('Get specified Text Command')
        .setRequired(false),
    ),
  run: async ({ interaction }) => {
    const embed = new MessageEmbed();

    const { client, channel, options } = interaction;

    const commandInput = options.getString('command');

    if (!commandInput) {
      const commandsCatagories = client.commandsCatagories;

      embed.setDescription(
        `Hello🙋‍♂️!\nOur source code: [Here](${githubLink})\nTurely appreciate that you are supporting us.`,
      );

      for (const catagory of commandsCatagories) {
        if (catagory[0].toLocaleLowerCase() === 'nsfw') {
          if (!(channel as TextChannel).nsfw) continue;
          else {
            catagory[0] += ' THIS CHANNEL ONLY';
          }
        }
        const text = catagory[1]
          .map((index: string) => `\`${index}\``)
          .join(', ');
        embed.addField(catagory[0], text);
      }

      const avatarURL = client.user?.defaultAvatarURL;

      embed.setTitle('Bot Assistance Centre').setFooter({
        text: `© ${new Date().getFullYear()} ${botname}`,
        iconURL: avatarURL!,
      });

      interaction.reply({
        embeds: [embed],
      });
      return;
    }
    let cmd: TextCommand | undefined;
    const commandMatching = client.commands.get(commandInput);
    const aliasesMatching = client.aliases.get(commandInput);
    // Fetch command destination.
    if (commandMatching) {
      cmd = commandMatching;
    } else if (aliasesMatching) {
      cmd = client.commands.get(aliasesMatching);
    } else {
      const cEmbed = callbackEmbed({
        text: 'Command requested does not exist!',
        color: 'RED',
        mode: 'error',
      });
      interaction.reply({
        embeds: [cEmbed],
      });
      return;
    }

    if (cmd) {
      const helpInfo = getCommandHelpInfo(cmd);
      interaction.reply({
        embeds: [helpInfo],
      });
    }
  },
};
