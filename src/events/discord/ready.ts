import type { Event } from '../../sturctures/event';

export const event: Event = {
  once: true,
  name: 'ready',
  run: async () => {
    console.log('Bot is in ready status!');
  },
};
