import { callbackEmbed } from '../../../utils/messages';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'pause',
    description: 'Pause song.',
    inVoiceChannelRequired: true,

    clientRequiredPermissions: [
      'CONNECT',
      'PRIORITY_SPEAKER',
      'SPEAK',
      'REQUEST_TO_SPEAK',
    ],
  },
  run: async ({ message }) => {
    const { member, client } = message;

    if (!member) return;

    const vc = member.voice.channel;

    if (!vc) return;

    const queue = client.distube.getQueue(message);

    if (!queue) {
      const cEmbed = callbackEmbed({
        text: `There is **NOTHING** in the queue right now!`,
        color: 'RED',
        mode: 'error',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    if (queue.paused) {
      // Resume if already been paused.
      queue.resume();

      const cEmbed = callbackEmbed({
        text: `**Resumed** the song for you.`,
        color: 'GREEN',
        mode: 'success',
      });
      message.reply({
        embeds: [cEmbed],
      });
      return;
    }

    // Pause the song.
    queue.pause();

    const cEmbed = callbackEmbed({
      text: `**Paused** the song for you.`,
      color: 'GREEN',
      mode: 'success',
    });
    message.reply({
      embeds: [cEmbed],
    });
  },
};
