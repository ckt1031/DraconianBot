/** Discord Client events */
export interface DiscordEvent {
  // Event Data
  name: string;
  once?: boolean;
  // eslint-disable-next-line no-unused-vars
  run: (...arguments_: any[]) => Promise<void>;
}
