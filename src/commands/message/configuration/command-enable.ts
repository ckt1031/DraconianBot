import type { TextCommand } from '../../../sturctures/command';
import { getServerData } from '../../../utils/database';
import { callbackEmbed } from '../../../utils/messages';
import { confirmInformationButtons } from '../../../utils/messages';

export const command: TextCommand = {
  data: {
    name: 'commandEnable',
    description: 'Enable command in local server.',
    directMessageAllowed: false,
    authorRequiredPermissions: ['ManageGuild'],
    intervalLimit: {
      hour: 2,
    },
    requiredArgs: [
      {
        name: 'command',
        type: 'STRING',
      },
    ],
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

    const guildData = await getServerData(guild.id);

    const disabledCommands = guildData.commands.global.disabled;

    if (!disabledCommands?.includes(targetCommand)) {
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
        inline: false,
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
      const index = disabledCommands.indexOf(targetCommand);

      if (index > -1) disabledCommands.splice(index, 1);

      guildData.commands.global.disabled = disabledCommands;

      await guildData.save();

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
