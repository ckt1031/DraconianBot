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
      return callbackEmbed({
        message,
        text: 'This command can only be executed in SERVER!',
        color: 'RED',
        mode: 'error',
      });
    }

    const targetPrefix: string = args[0];
    const originalPrefix = guildConfiguration.get(guild.id)?.prefix;

    if (!targetPrefix || targetPrefix.length > 3) {
      return callbackEmbed({
        message,
        text: 'Missing prefix or prefix does not match the requirement.',
        color: 'RED',
        mode: 'error',
      });
    }

    if (targetPrefix === originalPrefix) {
      return callbackEmbed({
        message,
        text: `You cannot set the same prefix: \`${targetPrefix}\``,
        color: 'RED',
        mode: 'error',
      });
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

      callbackEmbed({
        message,
        text: `Bot's prefix successfully configurated: \`${targetPrefix}\``,
        color: 'GREEN',
      });
    }
  },
};
