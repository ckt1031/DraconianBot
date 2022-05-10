import type { Client } from 'discord.js';
import type { DisTubeEvents } from 'distube';

/** Discord Client events */
export interface DiscordEvent {
  // Event Data
  name: string;
  once?: boolean;
  // eslint-disable-next-line no-unused-vars
  run: (client: Client, ...arguments_: any[]) => Promise<void>;
}

/** Discord Distube events */
export interface DistubeEvent {
  name: keyof DisTubeEvents;
  // eslint-disable-next-line no-unused-vars
  run: (client: Client, ...arguments_: any[]) => Promise<void>;
}
