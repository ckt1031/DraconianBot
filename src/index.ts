import 'dotenv/config';
import './validate-env';
import { basename } from 'node:path';

import chalk from 'chalk';
import { ShardingManager } from 'discord.js';

import { useShards } from '../config/bot.json';
import { isDev } from './utils/constants';

// Check NODE Version
const nodeVersions = process.versions.node.split('.');
if (Number(nodeVersions[0]) <= 16 && Number(nodeVersions[1]) < 6) {
  throw "Local Nodejs version doesn't match the requirement (16.6.0)";
}

process.setMaxListeners(15);

// If instacne is not production mode.
if (!isDev) {
  const log = console.log;

  log(chalk.bold.red('DEVELOPMENT / MAINTAINANCE MODE'));
  log(
    chalk.red.bold('Some production features will be disrupted or terminated.'),
  );
} else {
  process.on('uncaughtException', console.error);
  process.on('unhandledRejection', console.error);
}

if (useShards === true) {
  const directoryName = basename(__dirname);
  const manager = new ShardingManager(`./${directoryName}/bot.js`, {
    token: process.env.TOKEN,
  });

  process.env.USE_SHARD = 'YES';

  manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

  manager.spawn();
} else {
  import('./bot');
}
