import { guildConfiguration } from '../../utils/database';

import type { ThreadChannel } from 'discord.js';
import type { DiscordEvent } from '../../sturctures/event';

export const event: DiscordEvent = {
  name: 'threadCreate',
  run: async (_, thread: ThreadChannel) => {
    if (guildConfiguration.has(thread.guildId)) {
      const config = guildConfiguration.get(thread.guildId);
      // eslint-disable-next-line unicorn/require-array-join-separator
      if (config?.thread?.listen) thread.join();
    }
  },
};
