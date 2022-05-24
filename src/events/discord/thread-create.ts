import type { ThreadChannel } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  name: 'threadCreate',
  run: async (_, thread: ThreadChannel) => {
    // eslint-disable-next-line unicorn/require-array-join-separator
    thread.join();
  },
};
