import './http/server';

import { Client, Collection, Partials, GatewayIntentBits } from 'discord.js';
import type { SlashCommand, TextCommand } from './sturctures/command';
import { loadDiscordEvent, loadMusicEvent } from './loaders/event';
import { loadSlashCommand, loadTextCommand } from './loaders/command';

// Distube
import { DisTube } from 'distube';
import { SoundCloudPlugin } from '@distube/soundcloud';
import { SpotifyPlugin } from '@distube/spotify';
import { YtDlpPlugin } from '@distube/yt-dlp';

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
    commands: Collection<string, TextCommand>;
    commandsCatagories: Collection<string, string[]>;
    slashcommands: Collection<string, SlashCommand>;
    aliases: Collection<string, string>;
    distube: DisTube;
  }
}

export default client;
