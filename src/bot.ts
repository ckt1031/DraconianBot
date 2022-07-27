import './http/server';

import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';

import { loadSlashCommand, loadTextCommand } from './loaders/command';
import { loadDiscordEvent } from './loaders/event';
import type { SlashCommand, TextCommand } from './sturctures/command';
import { connect } from './utils/database';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
  partials: [
    Partials.User,
    Partials.Channel,
    Partials.Message,
    Partials.GuildMember,
  ],
});

client.commands = new Collection();
client.commandsCatagories = new Collection();
client.aliases = new Collection();
client.slashcommands = new Collection();

loadDiscordEvent(client);
loadTextCommand(client);

connect();

if (process.env.CLIENT_ID && process.env.TOKEN) {
  client.login(process.env.TOKEN);
  loadSlashCommand(client, process.env.CLIENT_ID, process.env.TOKEN);
}

export default client;

// declare types.
declare module 'discord.js' {
  export interface Client {
    aliases: Collection<string, string>;
    commands: Collection<string, TextCommand>;
    slashcommands: Collection<string, SlashCommand>;
    commandsCatagories: Collection<string, string[]>;
  }
}
