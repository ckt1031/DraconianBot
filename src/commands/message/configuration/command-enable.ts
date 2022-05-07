import { callbackEmbed } from '../../../utils/messages';

import { confirmInformationButtons } from '../../../utils/messages';
import { guildConfiguration } from '../../../utils/database';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  enabled: true,
  data: {
    name: 'commandEnable',
    description: 'Enable command in local server.',
    directMessageAllowed: false,
    requiredPermissions: ['MANAGE_GUILD'],
  },
  run: async ({ message, args }) => {
    const { guild, member, client } = message;

    const targetCommand: string = args[0];

    if (!guild) {
      return callbackEmbed({
        message,
        text: 'This command can only be executed in SERVER!',
        color: 'RED',
        mode: 'error',
      });
    }

    const originalPrefix = guildConfiguration.get(guild.id)?.commands.global
      .disabled;

    if (!originalPrefix?.includes(targetCommand)) {
      return callbackEmbed({
        message,
        text: 'This command had not been disabled!',
        color: 'RED',
        mode: 'error',
      });
    }

    const commandMatching = client.commands.get(targetCommand);

    if (!commandMatching || commandMatching.enabled === false) {
      return callbackEmbed({
        message,
        text: 'Requested command is not valid!',
        color: 'RED',
        mode: 'error',
      });
    }

    const fields = [
      {
        name: 'Action',
        value: `\`\`\`Enable command that's disabled in this server.\`\`\``,
      },
      {
        name: 'Command',
        value: `\`${commandMatching.data.name}\``,
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
      const index = originalPrefix.indexOf(targetCommand);

      if (index > -1) originalPrefix.splice(index, 1);

      // Set to Database
      guildConfiguration.set(
        guild.id,
        originalPrefix,
        'commands.global.disabled',
      );

      callbackEmbed({
        message,
        text: `Successfully enabled command: \`${commandMatching.data.name}\``,
        color: 'GREEN',
        mode: 'success',
      });
    }
  },
};
