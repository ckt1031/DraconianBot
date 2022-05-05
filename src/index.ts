import 'dotenv/config';

import chalk from 'chalk';
import { basename } from 'path';
import { ShardingManager } from 'discord.js';

import { useShards } from '../config/bot.json';

// Init
const nodeVersions = process.versions.node.split('.');
if (Number(nodeVersions[0]) < 16 || Number(nodeVersions[1]) < 6) {
  throw "Local Nodejs version doesn't match the requirement (16.6.0)";
}
if (!process.env.PORT) {
  process.env.PORT = '8080';
  console.log('Considered to change default HTTP port to 8080');
}
if (process.env.NODE_ENV !== 'production') {
  const log = console.log;
  log(chalk.bold.red('⚠️ DEVELOPMENT / MAINTAINANCE MODE ⚠️'));
  log(
    chalk.red.bold('Some production features will be disrupted or terminated.'),
  );
}
if (!process.env.TOKEN) throw 'ERROR: TOKEN is missing!';

if (useShards) {
  const directoryName = basename(__dirname);
  const manager = new ShardingManager(`./${directoryName}/bot.js`, {
    token: process.env.TOKEN,
  });

  process.env.USE_SHARD = 'YES';

  manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

  manager.spawn();
} else {
  require('./bot');
}
