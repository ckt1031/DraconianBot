import 'dotenv/config';

import chalk from 'chalk';

import './validate-env';

// Check NODE Version
const nodeVersions = process.versions.node.split('.');
if (Number(nodeVersions[0]) <= 16 && Number(nodeVersions[1]) < 9) {
  throw new Error('Node.js version must be 16.9.0 higher. Please update your Node.js version.');
}

process.setMaxListeners(15);

function logError(error: Error) {
  console.error(chalk.redBright(error.stack ?? error.message));
}

process.on('uncaughtException', logError);
process.on('unhandledRejection', logError);

import('./bot');
