import type { TextChannel } from 'discord.js';
import ms from 'ms';

import type { TextCommand } from '../../../sturctures/command';
import { callbackEmbed } from '../../../utils/messages';

export const command: TextCommand = {
  data: {
    name: 'slowmode',
    description: "Configure channel's slowmode",
    cooldownInterval: 25 * 1000,
    authorRequiredPermissions: ['ManageChannels', 'ManageMessages'],
    clientRequiredPermissions: ['ManageChannels', 'ManageMessages'],
    requiredArgs: [
      {
        name: 'duration',
        type: 'STRING',
        rest: true,
      },
    ],
  },
  run: async ({ message, args }) => {
    const duration = args[0];

    const { channel } = message;

    if (channel.isTextBased()) {
      if (!duration) return;

      const seconds = ms(duration) / 1000;

      if (Number.isNaN(seconds) || seconds < 0 || seconds > 21_601) {
        const cEmbed = callbackEmbed({
          text: 'Specified duration is not valid!',
          color: 'Red',
          mode: 'error',
        });
        message.reply({
          embeds: [cEmbed],
        });
        return;
      }

      const textChannel = channel as TextChannel;

      if (textChannel.rateLimitPerUser === seconds) {
        const cEmbed = callbackEmbed({
          text: `Remain unchanged: \`${duration}\``,
          color: 'Green',
          mode: 'success',
        });

        message.reply({
          embeds: [cEmbed],
        });
        return;
      }

      await textChannel.setRateLimitPerUser(seconds);

      const cEmbed = callbackEmbed({
        text: `Successfully configurated: \`${duration}\``,
        color: 'Green',
        mode: 'success',
      });

      message.reply({
        embeds: [cEmbed],
      });
    }
  },
};
