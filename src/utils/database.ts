import Enmap from 'enmap';

import { guildConfig, snipeConfig } from '../../config/db_model.json';

import type { GuildConfig, SnipeConfig } from '../sturctures/database';

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
