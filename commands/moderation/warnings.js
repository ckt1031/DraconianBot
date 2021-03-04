const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
	const emddd = new Discord.MessageEmbed()
		.setDescription(
			"<:cross1:747728200691482746> **Couldn't find that user...!**"
		)
		.setColor("RED");

	const warns = JSON.parse(
		fs.readFileSync("./temp-datastore/warnings.json", "utf8")
	);
	const user = message.mentions.users.first();
	if (message.mentions.users.size < 1) {
		return message
			.reply("You must mention someone to check their warns.")
			.catch(console.error);
	}
	if (!user) return message.channel.send(emddd);
	if (!warns[`${user.id}, ${message.guild.id}`]) {
		warns[`${user.id}, ${message.guild.id}`] = {
			warns: 0,
		};
	}
	// if (!warns[user.id]) return message.channel.send(emddd)

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTimestamp()
		.setTitle("<:tick:702386031361523723> Warn Check")
		.addField("User:", `${user.username}#${user.discriminator}`)
		.addField(
			"Number of warnings:",
			warns[`${user.id}, ${message.guild.id}`].warns
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
