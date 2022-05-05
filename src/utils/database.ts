import Enmap from 'enmap';

import db_model from '../../config/db_model.json';

interface databaseType {
  prefix: string;
}

export const guildConfiguration: Enmap<string | number, databaseType> =
  new Enmap({
    name: 'settings',
    autoFetch: true,
    fetchAll: false,
    cloneLevel: 'deep',
  });

export async function ensureServerData(guildId: string) {
  guildConfiguration.ensure(guildId, db_model);
}
