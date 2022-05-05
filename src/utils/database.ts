import Enmap from 'enmap';

import { guildConfig, snipeConfig } from '../../config/db_model.json';

export interface GuildConfig {
  prefix: string;
  commands: {
    global: {
      // Access
      disabled: string[];
      disabledCatagories: string[];
      // Cooldown
      customCooldown: {
        name: string;
        value: number;
        intervals: {
          minute: number;
          hour: number;
          day: number;
        };
      }[];
    };
    // Access
    userDisabled: { id: string; cmds: string[] }[];
    roleDisabled: { id: string; cmds: string[] }[];
    channelDisabled: { id: string; cmds: string[] }[];
  };
  snipe: {
    channelDisabled: string[];
  };
}

export interface SnipeConfig {
  author: {
    id: string;
    name: string;
  };
  content: {
    text: string;
    date: number;
    imageURL: string | undefined | null;
  };
}

export const guildConfiguration: Enmap<string, GuildConfig> = new Enmap({
  name: 'guildConfiguration',
  autoFetch: true,
  fetchAll: false,
  cloneLevel: 'deep',
});

export const snipeDatabase: Enmap<string, SnipeConfig> = new Enmap({
  name: 'snipeDatabase',
  autoFetch: true,
  fetchAll: false,
  cloneLevel: 'deep',
});

export function ensureServerData(guildId: string) {
  guildConfiguration.ensure(guildId, guildConfig);
}

export function ensureSnipeChannel(channelId: string) {
  snipeDatabase.ensure(channelId, snipeConfig);
}
