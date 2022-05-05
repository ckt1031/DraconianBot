import Enmap from 'enmap';

import { guildConfig, snipeConfig } from '../../config/db_model.json';

interface guildConfigType {
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
}

interface snipeType {
  author: {
    id: string;
    name: string;
  };
  content: {
    text: string;
    date: number;
    imageURL: string;
  };
}

export const guildConfiguration: Enmap<string, guildConfigType> = new Enmap({
  name: 'guildConfiguration',
  autoFetch: true,
  fetchAll: false,
  cloneLevel: 'deep',
});

export const snipeDatabase: Enmap<string, snipeType> = new Enmap({
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
