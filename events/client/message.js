const Discord = require("discord.js");
const settings = require("../../config/settings.json");

const cooldowns = new Discord.Collection();

module.exports = async (client, message) => {
	if (message.author.bot) return;
	const prefixesdatabase = client.settings.ensure(message.guild.id, settings);

	if (!client.settings.get(message.guild.id, "prefix")) {
		client.settings.set(message.guild.id, {
			prefix: settings.prefix
		});
	}

	if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
		message.reply(`my prefix is: \`${prefixesdatabase.prefix}\``);
	}

	if (!message.content.startsWith(prefixesdatabase.prefix)) return;
	const command = message.content
		.split(" ")[0]
		.slice(prefixesdatabase.prefix.length);
	const args = message.content.split(" ").slice(1);
	const cmd = client.commands.has(command) ? client.commands.get(command) : client.aliases.has(command) ? client.commands.get(client.aliases.get(command)) : null;
	if (!cmd) return;
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = cmd.cooldown || 2000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id);
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 2000;
			return message.reply(
				`Before using **${
					prefixesdatabase.prefix
				}${command}**, please wait for **${timeLeft.toFixed(
					1
				)} second for cooldowns!**`
			);
		}
	}
	timestamps.set(message.author.id, now + cooldownAmount);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
	try {
		return cmd.run(client, message, args);
	} catch (e) {
		console.log(`Invalid command: ${command}`);
	} finally {
		console.log(
			`${message.author.username} using command ${prefixesdatabase.prefix}${command}`
		);
	}
};
