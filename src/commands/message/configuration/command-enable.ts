import { callbackEmbed } from '../../../utils/messages';

import { confirmInformationButtons } from '../../../utils/messages';
import { guildConfiguration } from '../../../utils/database';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'commandEnable',
    description: 'Enable command in local server.',
    directMessageAllowed: false,
    authorRequiredPermissions: ['ManageGuild'],
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
        color: 'Red',
        mode: 'error',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    const originalPrefix = guildConfiguration.get(guild.id)?.commands.global
      .disabled;

    if (!originalPrefix?.includes(targetCommand)) {
      const cEmbed = callbackEmbed({
        text: 'This command had not been disabled!',
        color: 'Red',
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
        color: 'Red',
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

      const cEmbed = callbackEmbed({
        text: `Successfully enabled command: \`${commandMatching.data.name}\``,
        color: 'Green',
        mode: 'success',
      });
      message.reply({
        embeds: [cEmbed],
      });
    }
  },
};
