import { MessageEmbed, Permissions } from 'discord.js';

import type { ColorResolvable } from 'discord.js';

import { confirmInformationButtons } from '../../../utils/messages';
import { guildConfiguration, ensureServerData } from '../../../utils/database';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'setprefix',
    description: 'Configurate custom preifx.',
    directMessageAllowed: false,
    requiredPermissions: [Permissions.FLAGS.MANAGE_GUILD],
  },
  run: async ({ message, args }) => {
    const { guild, channel, member } = message;

    const embed = new MessageEmbed();

    const callBackEmbed = (text: string, color: ColorResolvable) => {
      embed.setDescription(text).setColor(color);
      channel.send({
        embeds: [embed],
      });
    };

    if (!guild) {
      return callBackEmbed(
        'This command can only be executed in SERVER!',
        'RED',
      );
    }

    const targetPrefix: string = args[0];
    const originalPrefix = guildConfiguration.get(guild.id)?.prefix;

    if (!targetPrefix || targetPrefix.length > 3) {
      return callBackEmbed(
        'Missing prefix or prefix does not match the requirement.',
        'RED',
      );
    }

    if (targetPrefix === originalPrefix) {
      return callBackEmbed(
        `You cannot set the same prefix: \`${targetPrefix}\``,
        'RED',
      );
    }

    ensureServerData(guild.id);

    const fields = [
      {
        name: 'Original',
        value: `\`${originalPrefix}\``,
        inline: true,
      },
      {
        name: 'Destination',
        value: `\`${targetPrefix}\``,
        inline: true,
      },
      {
        name: 'User',
        value: `\`${member?.user.tag}\``,
        inline: false,
      },
    ];

    const status = await confirmInformationButtons({
      message,
      title: 'Check to see if you confirm change(s) below',
      fields: fields,
    });

    if (status) {
      guildConfiguration.set(guild.id, targetPrefix, 'prefix');
      callBackEmbed(
        `Bot's prefix successfully configurated: \`${targetPrefix}\``,
        'GREEN',
      );
    }
  },
};
