import { Client } from 'discord.js';

export interface Event {
  // Event Data
  name: string;
  once?: boolean;
  // eslint-disable-next-line no-unused-vars
  run: (client: Client, ...args: any[]) => Promise<void>;
}
