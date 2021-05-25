const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
	const emddd = new Discord.MessageEmbed()
		.setDescription(
			"<:cross1:747728200691482746> You must mention someone to check their warns."
		)
		.setColor("RED");
	// const user = message.mentions.users.first();

	const warninguser = message.mentions.users.first();
	const user =
		warninguser ||
		(args[0]
			? args[0].length == 18
				? message.guild.members.cache.get(args[0]).user
				: message.author
			: message.author);
	// client.moderationdb
	if (!user) return message.channel.send(emddd);
	const key = `${message.guild.id}-${user.id}`;
	client.moderationdb.ensure(key, {
		warns: 0,
	});
	// if (!warns[user.id]) return message.channel.send(emddd)

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTimestamp()
		.setTitle(`Warnings of ${user.username}#${user.discriminator}`)
		.setDescription(
			`Number of warnings: ${client.moderationdb.get(key, "warns")}`
		);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "warnings",
	description: "Check the people you mentioned who has warnings or not",
	usage: "d!warnings <mention>",
	accessableby: "Members",
	aliases: [],
};
