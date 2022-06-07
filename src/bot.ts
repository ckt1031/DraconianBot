import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';
import { Client, Collection, GatewayIntentBits, Partials } from 'discord.js';
// Distube
import { DisTube } from 'distube';

import './http/server';
import { loadSlashCommand, loadTextCommand } from './loaders/command';
import { loadDiscordEvent, loadMusicEvent } from './loaders/event';
import type { SlashCommand, TextCommand } from './sturctures/command';

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

client.login(process.env.TOKEN);

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
    new YtDlpPlugin(),
    new SoundCloudPlugin(),
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
  ],
});

if (process.env.NODE_ENV === 'production') {
  process.on('exit', client.destroy);
  process.on('SIGTERM', client.destroy);
  process.on('SIGINT', client.destroy);
}

loadDiscordEvent(client);
loadMusicEvent(client);
loadTextCommand(client);

if (process.env.CLIENT_ID) {
  loadSlashCommand(client, process.env.CLIENT_ID!, process.env.TOKEN!);
}

// declare types.
declare module 'discord.js' {
  export interface Client {
    distube: DisTube;
    aliases: Collection<string, string>;
    commands: Collection<string, TextCommand>;
    slashcommands: Collection<string, SlashCommand>;
    commandsCatagories: Collection<string, string[]>;
  }
}

export default client;
