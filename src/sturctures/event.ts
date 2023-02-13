import type { ClientEvents } from 'discord.js';

/** Discord Client events */
export interface DiscordEvent {
  // Event Data
  name: keyof ClientEvents;
  once?: boolean;
  // eslint-disable-next-line no-unused-vars
  run: (...arguments_: any[]) => Promise<void> | void;
}
