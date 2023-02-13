import { SlashCommandBuilder } from '@discordjs/builders';
import type { TextChannel } from 'discord.js';
import { EmbedBuilder } from 'discord.js';

import { githubLink, name as botname } from '../../../config/bot.json';
import type { SlashCommand, TextCommand } from '../../sturctures/command';
import { getCommandHelpInfo } from '../../utils/cmds';
import { callbackEmbed } from '../../utils/messages';
import { command as helpTextCommand } from '../message/general/help';

export const command: SlashCommand = {
  slashData: new SlashCommandBuilder()
    .setName('help')
    .setDescription(helpTextCommand.data.description)
    .addStringOption(option =>
      option.setName('command').setDescription('Get specified Text Command').setRequired(false),
    ),
  run: async ({ interaction }) => {
    const embed = new EmbedBuilder();

    const { client, channel, options } = interaction;

    const commandInput = options.get('command')?.value;

    if (!commandInput || typeof commandInput !== 'string') {
      const commandsCatagories = client.commandsCatagories;

      embed.setDescription(
        `Hello🙋‍♂️!\nOur source code: [Here](${githubLink})\nTurely appreciate that you are supporting us.`,
      );

      for (const catagory of commandsCatagories) {
        if (catagory[0].toLocaleLowerCase() === 'nsfw') {
          if ((channel as TextChannel).nsfw) {
            catagory[0] += ' THIS CHANNEL ONLY';
          } else {
            continue;
          }
        }
        const text = catagory[1].map((index: string) => `\`${index}\``).join(', ');
        embed.addFields([{ name: catagory[0], value: text }]);
      }

      const avatarURL = client.user.defaultAvatarURL;

      embed.setTitle('Bot Assistance Centre').setFooter({
        text: `© ${new Date().getFullYear()} ${botname}`,
        iconURL: avatarURL,
      });

      await interaction.reply({
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
        color: 'Red',
        mode: 'error',
      });
      await interaction.reply({
        embeds: [cEmbed],
      });
      return;
    }

    if (cmd) {
      const helpInfo = getCommandHelpInfo(cmd);
      await interaction.reply({
        embeds: [helpInfo],
      });
    }
  },
};
