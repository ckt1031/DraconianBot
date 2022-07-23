import './http/server';

import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
import { DisTube } from 'distube';

import { loadSlashCommand, loadTextCommand } from './loaders/command';
import { loadDiscordEvent, loadMusicEvent } from './loaders/event';
import type { SlashCommand, TextCommand } from './sturctures/command';
import { connect } from './utils/database';

connect();

const client = new Client({
  intents: [
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
  partials: [
    Partials.GuildMember,
    Partials.User,
    Partials.Message,
    Partials.Channel,
  ],
});

client.commands = new Collection();
client.commandsCatagories = new Collection();
client.aliases = new Collection();
client.slashcommands = new Collection();
client.distube = new DisTube(client, {
  // While playing
  leaveOnStop: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  // Emits
  emitNewSongOnly: true,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  // Plugins
  plugins: [
    new YtDlpPlugin({
      update: true,
    }),
    new SoundCloudPlugin(),
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
  ],
});

loadDiscordEvent(client);
loadMusicEvent(client);
loadTextCommand(client);

if (process.env.CLIENT_ID && process.env.TOKEN) {
  client.login(process.env.TOKEN);
  loadSlashCommand(client, process.env.CLIENT_ID, process.env.TOKEN);
}

// declare types.
declare module 'discord.js' {
  export interface Client {
    aliases: Collection<string, string>;
    commands: Collection<string, TextCommand>;
    slashcommands: Collection<string, SlashCommand>;
    commandsCatagories: Collection<string, string[]>;
    distube: DisTube;
  }
}

export default client;
