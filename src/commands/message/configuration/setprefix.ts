import type { TextCommand } from '../../../sturctures/command';
import { getServerData } from '../../../utils/database';
import { callbackEmbed } from '../../../utils/messages';
import { confirmInformationButtons } from '../../../utils/messages';

export const command: TextCommand = {
  data: {
    name: 'setprefix',
    description: 'Configurate custom preifx.',
    directMessageAllowed: false,
    authorRequiredPermissions: ['ManageGuild'],
    intervalLimit: {
      hour: 2,
    },
    requiredArgs: [
      {
        type: 'STRING',
        rest: true,
        customLength: {
          min: 1,
          max: 4,
        },
      },
    ],
  },
  run: async ({ message, args }) => {
    const { guild, member } = message;

    if (!guild) {
      const cEmbed = callbackEmbed({
        text: 'This command can only be executed in SERVER!',
        color: 'Red',
        mode: 'error',
      });
      await message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    const targetPrefix: string = args[0];

    const serverData = await getServerData(guild.id);

    const originalPrefix = serverData.prefix;

    if (!targetPrefix || targetPrefix.length > 3) {
      const cEmbed = callbackEmbed({
        text: 'Missing prefix or prefix does not match the requirement.',
        color: 'Red',
        mode: 'error',
      });
      await message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    if (targetPrefix === originalPrefix) {
      const cEmbed = callbackEmbed({
        text: `You cannot set the same prefix: \`${targetPrefix}\``,
        color: 'Red',
        mode: 'error',
      });
      await message.reply({
        embeds: [cEmbed],
      });
      return;
    }

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
        value: `\`${member?.user.tag ?? ''}\``,
        inline: true,
      },
    ];

    const status = await confirmInformationButtons({
      message,
      title: 'Check to see if you confirm change(s) below',
      fields: fields,
    });

    if (status) {
      serverData.prefix = targetPrefix;

      await serverData.save();

      const cEmbed = callbackEmbed({
        text: `Bot's prefix successfully configurated: \`${targetPrefix}\``,
        color: 'Green',
      });
      await message.reply({
        embeds: [cEmbed],
      });
    }
  },
};
