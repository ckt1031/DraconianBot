const settings = require('../../settings.js');
const Discord = require('discord.js');
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
	const prefixesdatabase = client.settings.ensure(message.guild.id, settings);

	if (!client.settings.get(message.guild.id, 'prefix')) {
		client.settings.set(message.guild.id, {
			prefix: settings.prefix
		});
	}

	const prefixMention = new RegExp(`^<@!?${client.user.id}> `);
	const matchedPrefix = message.content.match(prefixMention)
		? message.content.match(prefixMention)[0]
		: prefixesdatabase.prefix;

	if (!message.content.startsWith(matchedPrefix)) return;

	let command = message.content.toLowerCase().split(' ')[0];
	command = command.slice(matchedPrefix.length);
	let args = message.content
		.slice(matchedPrefix.length)
		.trim()
		.split(' ');
	let cmd = args.shift().toLowerCase();

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 2) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 2000;
			return message.reply(
				`Please wait **${timeLeft.toFixed(
					1
				)} seconds** before reusing the **${matchedPrefix}${command}**!`
			);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try {
		let commandFile = require(`../../commands/${cmd}.js`);
		commandFile.run(client, message, args);
		
	} catch (e) {
		console.log(e.message);
	} finally {
		console.log(`${message.author.username} using command ${cmd}`);
	}
};
