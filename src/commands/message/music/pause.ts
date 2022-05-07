import { callbackEmbed } from '../../../utils/messages';

import type { TextCommand } from '../../../sturctures/command';

export const command: TextCommand = {
  data: {
    name: 'pause',
    description: 'Pause song.',
    inVoiceChannelRequired: true,
  },
  run: async ({ message }) => {
    const { member, client } = message;

    if (!member) return;

    const vc = member.voice.channel;

    if (!vc) return;

    const queue = client.distube.getQueue(message);

    if (!queue) {
      return callbackEmbed({
        message,
        text: `There is **NOTHING** in the queue right now!`,
        color: 'RED',
        mode: 'error',
      });
    }

    if (queue.paused) {
      // Resume if already been paused.
      queue.resume();

      return callbackEmbed({
        message,
        text: `**Resumed** the song for you.`,
        color: 'GREEN',
        mode: 'success',
      });
    }

    // Pause the song.
    queue.pause();

    callbackEmbed({
      message,
      text: `**Paused** the song for you.`,
      color: 'GREEN',
      mode: 'success',
    });
  },
};
