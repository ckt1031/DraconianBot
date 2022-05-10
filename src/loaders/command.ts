import { join, dirname, basename } from 'node:path';

import glob from 'glob';
import chalk from 'chalk';

import type { Client, ApplicationCommandDataResolvable } from 'discord.js';

import type { TextCommand, SlashCommand } from '../sturctures/command';

import { disabledCommandCatagories } from '../../config/bot.json';

export async function loadTextCommand(client: Client) {
  let folderPath = join(__dirname, '../commands/message/**/*.js');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  glob(folderPath, (error, allFiles) => {
    if (error) throw error;

    if (allFiles.length === 0) {
      console.log(
        chalk.blueBright.bold(
          '\nWARNING: Cannot find any possible command target.\n',
        ),
      );
    }

    interface Catagories {
      [key: string]: string[];
    }

    let catagories: Catagories = {};

    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];
      const commandFile = require(filePath);
      const command: TextCommand = commandFile.command;

      if (command?.enabled === false) continue;

      if (!command?.data) {
        throw `Error: ${filePath}`;
      }

      // Store command to memory.
      const cmdName = command.data.name;
      if (client.commands.has(cmdName)) {
        console.error(filePath);
        throw 'Duplicated command is found!';
      }

      const catagory = basename(dirname(filePath));

      const disabledCatagories: string[] = disabledCommandCatagories;

      if (!disabledCatagories.includes(catagory)) {
        if (catagory) {
          command.data.catagory = catagory;
          if (command.data.publicLevel !== 'None') {
            if (!catagories[catagory]) {
              catagories[catagory] = [];
            }
            catagories[catagory].push(cmdName);
          }
        }

        client.commands.set(cmdName, command);
        if (command.data.aliases) {
          for (const alias of command.data.aliases) {
            if (client.aliases.has(alias)) {
              throw 'Duplicated command alias is found!';
            }
            // Store aliase(s) to memory if exists.
            client.aliases.set(alias, command.data.name);
          }
        }
        delete require.cache[require.resolve(filePath)];
      }
    }

    for (const value of Object.entries(catagories)) {
      client.commandsCatagories.set(value[0], value[1]);
    }
  });
}

export async function loadSlashCommand(client: Client) {
  let folderPath = join(__dirname, '../commands/slash/*.js');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  glob(folderPath, (error, allFiles) => {
    if (error) throw error;
    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];
      const commandFile = require(filePath);
      const slashCommand: SlashCommand = commandFile.command;

      const slashCommandCollection = client.slashcommands;
      const name = slashCommand.data.name;

      if (slashCommandCollection.has(name)) {
        throw 'Duplicated slash command is found!';
      }

      client.slashcommands.set(name, slashCommand);

      const commandInfo: ApplicationCommandDataResolvable = {
        name: name,
        description: slashCommand.data.description,
        options: slashCommand.data.options,
        type: slashCommand.data.type,
      };

      const isProduction = process.env.NODE_ENV === 'production';
      if (isProduction) {
        const application = client.application;
        if (application !== null) {
          application.commands.create(commandInfo);
        }
      } else {
        const guildId = process.env.DEV_GUILD_ID;
        if (guildId) {
          const guilds = client.guilds.cache.get(guildId);
          if (guilds !== undefined) {
            guilds.commands.create(commandInfo);
          }
        }
      }

      delete require.cache[require.resolve(allFiles[index])];
    }
  });
}
