import 'dotenv/config';

import chalk from 'chalk';
import { basename } from 'path';
import { ShardingManager } from 'discord.js';

import { useShards } from '../config/bot.json';

// Init
if (!process.env.TOKEN) throw 'Missing TOKEN';
if (!process.env.PORT) process.env.PORT = '8080';
if (process.env.NODE_ENV !== 'production') {
  const log = console.log;
  log(chalk.bold.red('⚠️ DEVELOPMENT / MAINTAINING MODE ⚠️'));
  log(chalk.red.italic('Some features will be disrupted or terminated.'));
}

if (useShards) {
  const directoryName = basename(__dirname);
  const manager = new ShardingManager(`./${directoryName}/bot.js`, {
    token: process.env.TOKEN,
  });

  manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));

  manager.spawn();
} else {
  require('./bot.js');
}
