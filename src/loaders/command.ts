import glob from 'glob';
import chalk from 'chalk';
import { join, sep, dirname } from 'node:path';

import type { Client, ApplicationCommandDataResolvable } from 'discord.js';
import type { TextCommand, SlashCommand } from '../sturctures/command';

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
    for (let index = 0, l = allFiles.length; index < l; index++) {
      const filePath = allFiles[index];
      const commandFile = require(filePath);
      const command: TextCommand = commandFile.command;
      // Store command to memory.
      const cmdName = command.data.name;
      if (client.commands.has(cmdName)) {
        throw 'Duplicated command is found!';
      }
      command.data.catagory = dirname(filePath).split(sep).pop();
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

      client.slashcommands.set(slashCommand.data.name, slashCommand);

      const commandInfo: ApplicationCommandDataResolvable = {
        name: name,
        description: slashCommand.data.description,
        options: slashCommand.data.options,
        type: slashCommand.data.type,
      };

      const isProd = process.env.NODE_ENV === 'production';
      if (isProd) {
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
            console.log(`Created slash command for guild (${guildId})`);
          }
        }
      }
      delete require.cache[require.resolve(allFiles[index])];
    }
  });
}
