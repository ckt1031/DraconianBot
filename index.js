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
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = config.emoji;
client.colors = client.config.colors;
client.snipes = new Map();
const cooldowns = new Discord.Collection();
const settings = require('./settings.js');
let nz_date_string = new Date().toLocaleString("zh-hk", { timeZone: "Asia/Hong_Kong" });
client.mapss = new Map();
client.mapss.set('uptimedate', nz_date_string);


const http = require('http');
http.createServer((_, res) => res.end('Draconian Stays Online!')).listen(8080);

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
	youtubeDL: true
});

fs.readdir('./commands/', (err, files) => {
	if (err) return console.log(err);

	files.forEach(file => {
		if (!file.endsWith('.js')) return;

		let props = require(`./commands/${file}`);

		console.log('Successfully loaded ' + file);

		let commandName = file.split('.')[0];

		client.commands.set(commandName, props);

	});
});

fs.readdir('./events/', (err, files) => {
	if (err) console.log(err);
	files.forEach(file => {
		let eventFunc = require(`./events/${file}`);
		console.log("loaded Event" + file)
		let eventName = file.split(".")[0];
		client.on(eventName, (...args) => eventFunc.run(client, ...args));
	});
});

// Delete this area of code if you don't use discord bot lists
// dbl.on('posted', () => {
// 	console.log('Server count posted!');
// });

// dbl.on('error', e => {
// 	console.log(`Oops! ${e}`);
// });

if (!db.get('giveaways')) db.set('giveaways', []);

const { GiveawaysManager } = require('discord-giveaways');
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
	updateCountdownEvery: 5000,
	default: {
		botsCanWin: false,
		exemptPermissions: ['MANAGE_MESSAGES', 'ADMINISTRATOR'],
		embedColor: '#FF0000',
		reaction: '🎉'
	}
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on(
	'giveawayReactionAdded',
	(giveaway, member, reaction) => {
		console.log(
			`${member.user.tag} entered giveaway #${giveaway.messageID} (${
			reaction.emoji.name
			})`
		);
	}
);

client.giveawaysManager.on(
	'giveawayReactionRemoved',
	(giveaway, member, reaction) => {
		console.log(
			`${member.user.tag} unreact to giveaway #${giveaway.messageID} (${
			reaction.emoji.name
			})`
		);
	}
);

const status = queue =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filter ||
	'Off'}\` | Loop: \`${
	queue.repeatMode
		? queue.repeatMode == 2
			? 'All Queue'
			: 'This Song'
		: 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;
client.distube
	.on('playSong', (message, queue, song) =>
		message.channel.send(
			`${client.emotes.play} | Playing \`${song.name}\` - \`${
			song.formattedDuration
			}\`\n${status(queue)}`
		)
	)
	.on('addSong', (message, queue, song) =>
		message.channel.send(
			`${client.emotes.success} | Added ${song.name} - \`${
			song.formattedDuration
			}\` to the queue`
		)
	)
	.on('playList', (message, queue, playlist, song) =>
		message.channel.send(
			`${client.emotes.play} | Play \`${playlist.name}\` playlist (${
			playlist.total_items
			} songs).\nNow playing \`${song.name}\` - \`${
			song.formattedDuration
			}\`\n${status(queue)}`
		)
	)
	.on('addList', (message, queue, playlist) =>
		message.channel.send(
			`${client.emotes.success} | Added \`${playlist.name}\` playlist (${
			playlist.total_items
			} songs) to queue\n${status(queue)}`
		)
	)
	// DisTubeOptions.searchSongs = true
	.on('searchResult', (message, result) => {
		let i = 0;
		message.channel.send(
			`**Choose an option from below**\n${result
				.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
				.join('\n')}\n*Enter anything else or wait 60 seconds to cancel*`
		);
	})
	// DisTubeOptions.searchSongs = true
	.on('searchCancel', message =>
		message.channel.send(`${client.emotes.error} | Searching canceled`)
	)
	.on('error', (message, err) =>
		message.channel.send(
			`${client.emotes.error} | An error encountered: ${err}`
		)
	);
