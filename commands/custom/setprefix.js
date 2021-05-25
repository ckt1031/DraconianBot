const Discord = require("discord.js");
const fs = require("fs");
const settings = require("../../settings.json");

module.exports.run = async (client, message, args) => {
	const embedmissingperms = new Discord.MessageEmbed()
		.setDescription(
			`<:cross1:747728200691482746> ${message.author.username}, Missing Permission!`
		)
		.setColor("RED");

	const embedmissing = new Discord.MessageEmbed()
		.setDescription(
			`<:cross1:747728200691482746> Please type the prefix you want to set!`
		)
		.setColor("RED");

	const embedtoolong = new Discord.MessageEmbed()
		.setDescription(
			`<:cross1:747728200691482746> Prefix's length shouldn't be longer than 3 letters`
		)
		.setColor("RED");

	if (!message.member.hasPermission("MANAGE_SERVER"))
		return message.channel.send(embedmissingperms);

	await client.settings.ensure(message.guild.id, settings);

	if (!args[0]) return message.channel.send(embedmissing);

	if (args[0].length > 3) return message.channel.send(embedtoolong);

	// We can confirm everything's done to the client.

	const warningsembed = new Discord.MessageEmbed()
		.setDescription(
			`:warning: When you change the default prefix, the current prefix \`${client.settings.get(
				message.guild.id,
				"prefix"
			)}\` will not be woking anymore and it will be changed to new prefix you enter.\n\nPlease type \`confirm\` to confirm your action!`
		)
		.setColor("RED");

	const calcelembed = new Discord.MessageEmbed()
		.setDescription(
			`<:cross1:747728200691482746> Time's up! Setting prefix's action cancelled!`
		)
		.setColor("RED");

	message.channel.send(warningsembed);
	await message.channel
		.awaitMessages(
			m => m.author.id === message.author.id && m.content === "confirm",
			{
				max: 1,
				time: 20000,
				errors: ["time"],
			}
		)
		.then(async collected => {
			await client.settings.set(message.guild.id, args[0], "prefix");
			message.channel.send(
				`My command prefix has been changed to: ${client.settings.get(
					message.guild.id,
					"prefix"
				)}`
			);
		})
		.catch(collected => message.channel.send(calcelembed));
};

module.exports.help = {
	name: "setprefix",
	description: "This command is used for changing the prefix.",
	usage: "d!setprefix <value>",
	accessableby: "Manage Server",
	aliases: [],
};
