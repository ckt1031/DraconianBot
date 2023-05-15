import 'dotenv/config';

import * as Sentry from '@sentry/node';
import chalk from 'chalk';

import './validate-env';

import { isDev } from './utils/constants';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: !isDev && typeof process.env.SENTRY_DSN === 'string',
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1,
});

// Check NODE Version
const nodeVersions = process.versions.node.split('.');
if (Number(nodeVersions[0]) <= 16 && Number(nodeVersions[1]) < 9) {
  throw new Error('Node.js version must be 16.9.0 higher. Please update your Node.js version.');
}

process.setMaxListeners(15);

function logError(error: Error) {
  console.error(chalk.redBright(error.stack ?? error.message));
  if (typeof process.env.SENTRY_DSN === 'string') Sentry.captureException(error);
}

process.on('uncaughtException', logError);
process.on('unhandledRejection', logError);

import('./bot');
