import 'dotenv/config';

import { Collection, Client, Intents } from 'discord.js';
import { DisTube } from 'distube';

import eventHandler from './handlers/event';
import cmdHandler from './handlers/command';

import type { TextCommand, SlashCommand } from './sturctures/command';

// Init
if (!process.env.TOKEN) throw 'Missing TOKEN';
if (!process.env.PORT) {
  process.env.PORT = '8080';
}

declare module 'discord.js' {
  export interface Client {
    commands: Collection<string, TextCommand>;
    slashcommands: Collection<string, SlashCommand>;
    aliases: Collection<string, string>;
    cooldown: Collection<string, number>;
    distube: DisTube;
  }
}

const client = new Client({
  partials: ['GUILD_MEMBER', 'USER', 'MESSAGE', 'CHANNEL', 'REACTION'],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
  intents: new Intents(32767),
});

export default client;

client.commands = new Collection();
client.aliases = new Collection();
client.slashcommands = new Collection();
client.cooldown = new Collection();
client.distube = new DisTube(client, {
  // While playing
  leaveOnStop: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  // Misc
  youtubeDL: false,
});

client.login(process.env.TOKEN);

eventHandler(client);
cmdHandler(client);
