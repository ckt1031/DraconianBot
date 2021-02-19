const settings = require('../../settings.json');
const Discord = require('discord.js');
const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
	const prefixesdatabase = client.settings.ensure(message.guild.id, settings);

	if (!client.settings.get(message.guild.id, 'prefix')) {
		client.settings.set(message.guild.id, {
			prefix: settings.prefix
		});
	}

	if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
		message.channel.send(`Hi, my prefix: \`${prefixesdatabase.prefix}\``);
	}
	
	if (!message.content.startsWith(prefixesdatabase.prefix)) return;
	let command = message.content.split(' ')[0].slice(prefixesdatabase.prefix.length);
	let args = message.content.split(' ').slice(1);
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	};
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 2) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 2000;
			return message.reply(
				`Before using **${prefixesdatabase.prefix}${command}**, please wait for **${timeLeft.toFixed(
					1
				)} second for cooldowns!**`
			);
		};
	};
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	let cmd;
	if (client.commands.has(command)) {
		cmd = client.commands.get(command);
	} else if (client.aliases.has(command)) {
		cmd = client.commands.get(client.aliases.get(command));
	};
	try {
		cmd.run(client, message, args);
	} catch (e) {
		return console.log(`Invalid command: ${command}`);
	} finally {
		console.log(`${message.author.username} using command ${prefixesdatabase.prefix}${command}`);
	}
};