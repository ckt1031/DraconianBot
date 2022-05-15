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
    intervalLimit: {
      hour: 2,
    },
  },
  run: async ({ message, args }) => {
    const { guild, member, client } = message;

    const targetCommand: string = args[0];

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

    const originalPrefix = guildConfiguration.get(guild.id)?.commands.global
      .disabled;

    if (!originalPrefix || originalPrefix?.includes(targetCommand)) {
      const cEmbed = callbackEmbed({
        text: 'This command had not been enabled!',
        color: 'RED',
        mode: 'error',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    const commandMatching = client.commands.get(targetCommand);

    if (!commandMatching || commandMatching.enabled === false) {
      const cEmbed = callbackEmbed({
        text: 'Requested command is not valid!',
        color: 'RED',
        mode: 'error',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
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

      const cEmbed = callbackEmbed({
        text: `Successfully disabled command: \`${commandMatching.data.name}\``,
        color: 'GREEN',
        mode: 'success',
      });
      message.reply({
        embeds: [cEmbed],
      });
    }
  },
};
