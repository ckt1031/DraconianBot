require('dotenv').config()

const Enmap = require('enmap');
const Discord = require('discord.js');
const client = new Discord.Client({
	disableMentions: 'everyone'
});
const config = require('./config.json');
const fs = require('fs');
client.config = config;
client.login(process.env.TOKEN);
const db = require('quick.db');
// Delete 2 lines code if you don't use discord bot lists of top.gg
// const DBL = require('dblapi.js');
// const dbl = new DBL(process.env.DBLTOKEN, client);
const { GiveawaysManager } = require('discord-giveaways');
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;
client.colors = client.config.colors;
client.snipes = new Map();
// client.dbl = dbl
const cooldowns = new Discord.Collection();
const settings = require('./settings.json');
let nz_date_string = new Date().toLocaleString("en-US", { timeZone: "Asia/Hong_Kong" });
client.mapss = new Map();
client.mapss.set('uptimedate', nz_date_string);
["command", "event", "giveaway", "music"].forEach(x => require(`./handlers/${x}.js`)(client));
// ["dbl-loader"].forEach(x => require(`./handlers/${x}.js`)(client));
const httpOutPut = require('./server/http');
const alwaysOn = require('./server/alwaysOn');

httpOutPut()
alwaysOn()

// Delete this area of code if you don't use discord bot lists
// const blapi = require('blapi');
// const apiKeys = {
// 	'botlist-url1': process.env.btoken1, // Add other bot lists as needed
// 	'botlist-url2': process.env.btoken2
// };
// blapi.handle(client, apiKeys, 60);
// blapi.setLogging(true);

client.settings = new Enmap({
	name: 'settings',
	fetchAll: false,
	autoFetch: true,
	cloneLevel: 'deep'
});

const DisTube = require('distube');
client.distube = new DisTube(client, {
	leaveOnFinish: true,
	leaveOnEmpty: true,
	leaveOnStop: true,
	youtubeDL: true,
	updateYouTubeDL: true,
	youtubeCookie: "GPS=1; YSC=w5dGoHzqQRI; VISITOR_INFO1_LIVE=B4ElBqxSDv4; PREF=tz=Asia.Hong_Kong"
});
if (!db.get('giveaways')) db.set('giveaways', []);

const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
	// This function is called when the manager needs to get all the giveaway stored in the database.
	async getAllGiveaways() {
		// Get all the giveaway in the database
		return db.get('giveaways');
	}

	// This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
	async saveGiveaway(messageID, giveawayData) {
		// Add the new one
		db.push('giveaways', giveawayData);
		// Don't forget to return something!
		return true;
	}

	async editGiveaway(messageID, giveawayData) {
		// Gets all the current giveaways
		const giveaways = db.get('giveaways');
		// Remove the old giveaway from the current giveaways ID
		const newGiveawaysArray = giveaways.filter(
			giveaway => giveaway.messageID !== messageID
		);
		// Push the new giveaway to the array
		newGiveawaysArray.push(giveawayData);
		// Save the updated array
		db.set('giveaways', newGiveawaysArray);
		// Don't forget to return something!
		return true;
	}

	// This function is called when a giveaway needs to be deleted from the database.
	async deleteGiveaway(messageID) {
		// Remove the giveaway from the array
		const newGiveawaysArray = db
			.get('giveaways')
			.filter(giveaway => giveaway.messageID !== messageID);
		// Save the updated array
		db.set('giveaways', newGiveawaysArray);
		// Don't forget to return something!
		return true;
	}
};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
	storage: false, // Important - use false instead of a storage path
	updateCountdownEvery: 10000,
	endedGiveawaysLifetime: 30000,
	hasGuildMembersIntent: false,
	default: {
		botsCanWin: false,
		exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
		embedColor: '#ff6969',
		embedColorEnd: "#505050",
		reaction: '🎉'
	}
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!

client.status = queue =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filter ||
	'Off'}\` | Loop: \`${
	queue.repeatMode
		? queue.repeatMode == 2
			? 'All Queue'
			: 'This Song'
		: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
