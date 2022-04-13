// Discord.js
import { Collection, Client, Intents } from 'discord.js';

import Enmap from 'enmap';
import dotenv from 'dotenv';
import { DisTube } from 'distube';
import { GiveawaysManager } from 'discord-giveaways';

import httpServer from './http/server';

dotenv.config();

// Init
if (!process.env.TOKEN) throw 'Missing TOKEN';
if (!process.env.PORT) {
  process.env.PORT = '8080';
}

const client = new Client({
  partials: ['GUILD_MEMBER', 'USER', 'MESSAGE', 'CHANNEL', 'REACTION'],
  allowedMentions: { parse: ['users', 'roles'], repliedUser: false },
  intents: new Intents(32_767),
});

export default client;

client.commands = new Collection();
client.slashcommands = new Collection();
client.aliases = new Collection();
client.cooldown = new Collection();
client.distube = new DisTube(client, {
  leaveOnStop: false,
  leaveOnEmpty: true,
  leaveOnFinish: true,
  emitNewSongOnly: true,
  youtubeDL: false,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
});

const giveawayDB = new Enmap({ name: 'giveaways' });

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
  // This function is called when the manager needs to get all giveaways which are stored in the database.
  async getAllGiveaways() {
    // Get all giveaways from the database
    return giveawayDB.fetchEverything().array();
  }

  // This function is called when a giveaway needs to be saved in the database.
  async saveGiveaway(messageId: string, giveawayData) {
    // Add the new giveaway to the database
    giveawayDB.set(messageId, giveawayData);
    // Don't forget to return something!
    return true;
  }

  // This function is called when a giveaway needs to be edited in the database.
  // eslint-disable-next-line sonarjs/no-identical-functions
  async editGiveaway(messageId: string, giveawayData) {
    // Replace the unedited giveaway with the edited giveaway
    giveawayDB.set(messageId, giveawayData);
    // Don't forget to return something!
    return true;
  }

  // This function is called when a giveaway needs to be deleted from the database.
  override async deleteGiveaway(messageId: string) {
    // Remove the giveaway from the database
    giveawayDB.delete(messageId);
    // Don't forget to return something!
    return true;
  }
};

const manager = new GiveawayManagerWithOwnDatabase(client, {
  default: {
    botsCanWin: false,
    embedColor: '#FF0000',
    embedColorEnd: '#000000',
    reaction: '🎉',
  },
});

client.giveawaysManager = manager;

client.login(process.env.TOKEN);

declare module 'discord.js' {
  export interface Client {
    commands: Collection<unknown, any>;
    slashcommands: Collection<unknown, any>;
    aliases: Collection<unknown, any>;
    cooldown: Collection<unknown, any>;
    distube: DisTube;
    giveawaysManager: GiveawaysManager;
  }
}

httpServer();
