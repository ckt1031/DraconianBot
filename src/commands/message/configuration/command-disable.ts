import { callbackEmbed } from '../../../utils/messages';
import { guildConfiguration } from '../../../utils/database';
import { confirmInformationButtons } from '../../../utils/messages';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'commandDisable',
    description: 'Disable command in local server.',
    directMessageAllowed: false,
    authorRequiredPermissions: ['MANAGE_GUILD'],
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

    if (!originalPrefix || originalPrefix?.includes(targetCommand)) {
      return callbackEmbed({
        message,
        text: 'This command had not been enabled!',
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
        value: `\`\`\`Disable command that's enabled in this server.\`\`\``,
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
      guildConfiguration.push(
        guild.id,
        commandMatching.data.name,
        'commands.global.disabled',
      );

      callbackEmbed({
        message,
        text: `Successfully disabled command: \`${commandMatching.data.name}\``,
        color: 'GREEN',
        mode: 'success',
      });
    }
  },
};
