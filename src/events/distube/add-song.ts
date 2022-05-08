import type { Queue, Song } from 'distube';

import type { DistubeEvent } from '../../sturctures/event';

export const event: DistubeEvent = {
  name: 'addSong',
  run: async (_, queue: Queue, song: Song) => {
    if (queue.textChannel) {
      const { name, formattedDuration, user } = song;

      queue.textChannel.send({
        content: `Playing \`${name}\` - \`${formattedDuration}\`\nRequested by: ${user}`,
      });
    }
  },
};
