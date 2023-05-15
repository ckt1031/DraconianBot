import { basename, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { REST } from '@discordjs/rest';
import chalk from 'chalk';
import type { Client } from 'discord.js';
import type {
  RESTGetAPIApplicationCommandsResult,
  RESTPostAPIApplicationCommandsJSONBody,
} from 'discord-api-types/v9';
import { Routes } from 'discord-api-types/v9';
import { glob } from 'glob';

import { disabledCommandCatagories } from '../../config/bot.json';
import type { SlashCommand, TextCommand } from '../sturctures/command';
import { isDev } from '../utils/constants';

type TextCommandCatagories = Record<string, string[]>;

const __dirname = dirname(fileURLToPath(import.meta.url));

/** Text Command Loaders */
export async function loadTextCommand(client: Client) {
  let folderPath = join(__dirname, '../commands/message/**/*.ts');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  const allFiles = await glob(folderPath);

  if (allFiles.length === 0) {
    return;
  }

  const catagories: TextCommandCatagories = {};

  for (const filePath of allFiles) {
    const commandFile = await import(filePath);
    const command: TextCommand = commandFile.command;

    // Neglect if disabled.
    if (command.enabled === false) continue;

    // Store command to memory.
    const cmdName = command.data.name;
    if (client.commands.has(cmdName)) {
      throw new Error('Duplicated command is found!');
    }

    const catagory = basename(dirname(filePath));

    const disabledCatagories: string[] = disabledCommandCatagories;

    if (!disabledCatagories.includes(catagory)) {
      if (catagory) {
        command.data.catagory = catagory;
        if (command.data.publicLevel !== 'None') {
          if (!catagories[String(catagory)]) {
            catagories[String(catagory)] = [];
          }
          catagories[String(catagory)].push(cmdName);
        }
      }

      if (command.data.intervalLimit) {
        const list = command.data.intervalLimit;
        if (list.minute! > list.hour! || list.hour! > list.day!) {
          throw 'Impolitic Custom Interval style!';
        }
      }

      client.commands.set(cmdName, command);

      if (command.data.aliases) {
        for (const alias of command.data.aliases) {
          if (client.aliases.has(alias)) {
            throw new Error('Duplicated alias is found!');
          }
          // Store aliase(s) to memory if exists.
          client.aliases.set(alias, command.data.name);
        }
      }
    }
  }

  for (const value of Object.entries(catagories)) {
    client.commandsCatagories.set(value[0], value[1]);
  }

  // Print number of loaded commands.
  console.log(chalk.greenBright.bold(`Loaded ${client.commands.size} text commands.`));
}

/** Load Slash commands to API & Collection */
export async function loadSlashCommand(client: Client) {
  let folderPath = join(__dirname, '../commands/slash/**/*.ts');

  // Parse path in windows
  if (process.platform === 'win32') {
    folderPath = folderPath.replaceAll('\\', '/');
  }

  const allFiles = await glob(folderPath);

  const slashCommandData: RESTPostAPIApplicationCommandsJSONBody[] = [];

  for (const filePath of allFiles) {
    const commandFile = await import(filePath);
    const slashCommand: SlashCommand = commandFile.command;

    const slashCommandCollection = client.slashcommands;
    const name = slashCommand.slashData.name;

    if (slashCommandCollection.has(name)) {
      throw new Error('Duplicated slash command is found!');
    }

    client.slashcommands.set(name, slashCommand);

    slashCommandData.push(slashCommand.slashData.toJSON());
  }

  const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

  if (isDev) {
    // Guild & Development Commands.
    const guildId = process.env.DEV_GUILD_ID;

    if (guildId) {
      const guildCommands = await rest.get(
        Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
      );

      for (const command of guildCommands as RESTGetAPIApplicationCommandsResult) {
        const deleteUrl = `${Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId)}/${
          command.id
        }`;
        await rest.delete(`/${deleteUrl}`);
      }

      await rest.put(Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId), {
        body: slashCommandData,
      });
    }
  } else {
    // Global Commands
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: slashCommandData,
    });
  }

  // Print number of loaded commands.
  console.log(chalk.greenBright.bold(`Loaded ${client.slashcommands.size} slash commands.`));
}
