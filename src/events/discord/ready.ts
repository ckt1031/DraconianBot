import { loadSlashCommand } from '../../loaders/command';
import type { Event } from '../../sturctures/event';

export const event: Event = {
  once: true,
  name: 'ready',
  run: async client => {
    console.log('Bot is in ready status!');
    loadSlashCommand(client);
  },
};
