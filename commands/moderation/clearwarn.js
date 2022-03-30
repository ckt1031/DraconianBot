const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
	const notice1 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} **${message.author.username}, Missing Permission**`
		)
		.setColor("RED");
	const notice3 = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} I don't have permission to warn people!`)
		.setColor("RED");
	const noticEEEe2 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} You must mention someone to clear their warns`
		)
		.setColor("RED");
	const noticEffEEe2 = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} This user didn't have any warning record`)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
		return message.channel
			.send(notice3)
			.then(m => m.delete({ timeout: 15000 }));
	}
	if (!message.member.hasPermission("KICK_MEMBERS")) {
		return message.channel
			.send(notice1)
			.then(m => m.delete({ timeout: 15000 }));
	}

	const warninguser = message.mentions.users.first();
	const user =
		warninguser ||
		(args[0]
			? args[0].length == 18
				? message.guild.members.cache.get(args[0]).user
				: false
			: false);

	if (!user) return message.channel.send(noticEEEe2);
	const key = `${message.guild.id}-${user.id}`;
	client.moderationdb.ensure(key, {
		guildid: message.guild.id,
		userid: user.id,
		warns: 0,
		isMuted: false,
		timeMuteEnd: 0,
	});
	if (client.moderationdb.get(key, "warns") == 0)
		return message.channel.send(noticEffEEe2);

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setDescription(
			`${emojis.tick} **${client.moderationdb.get(
				key,
				"warns"
			)}** warnings have been cleared for ${user.username}#${
				user.discriminator
			}`
		);
	await client.moderationdb.set(key, {
		warns: 0,
	});
	message.channel.send({ embed });
};

module.exports.help = {
	name: "clearwarn",
	description: "Clear the warnings",
	usage: "d!clearwarn <mention>",
	accessableby: "Manage Roles",
	aliases: [],
};
