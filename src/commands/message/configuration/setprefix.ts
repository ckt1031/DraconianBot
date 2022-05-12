import { callbackEmbed } from '../../../utils/messages';

import { confirmInformationButtons } from '../../../utils/messages';
import { guildConfiguration, ensureServerData } from '../../../utils/database';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'setprefix',
    description: 'Configurate custom preifx.',
    directMessageAllowed: false,
    authorRequiredPermissions: ['MANAGE_GUILD'],
  },
  run: async ({ message, args }) => {
    const { guild, member } = message;

    if (!guild) {
      const cEmbed = callbackEmbed({
        text: 'This command can only be executed in SERVER!',
        color: 'RED',
        mode: 'error',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    const targetPrefix: string = args[0];
    const originalPrefix = guildConfiguration.get(guild.id)?.prefix;

    if (!targetPrefix || targetPrefix.length > 3) {
      const cEmbed = callbackEmbed({
        text: 'Missing prefix or prefix does not match the requirement.',
        color: 'RED',
        mode: 'error',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    if (targetPrefix === originalPrefix) {
      const cEmbed = callbackEmbed({
        text: `You cannot set the same prefix: \`${targetPrefix}\``,
        color: 'RED',
        mode: 'error',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
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
        inline: true,
      },
    ];

    const status = await confirmInformationButtons({
      message,
      title: 'Check to see if you confirm change(s) below',
      fields: fields,
    });

    if (status) {
      // Set to database.
      guildConfiguration.set(guild.id, targetPrefix, 'prefix');

      const cEmbed = callbackEmbed({
        text: `Bot's prefix successfully configurated: \`${targetPrefix}\``,
        color: 'GREEN',
      });
      message.reply({
        embeds: [cEmbed],
      });
    }
  },
};
