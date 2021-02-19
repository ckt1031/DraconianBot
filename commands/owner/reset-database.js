const Discord = require("discord.js");
const settings = require('../../settings.json');

exports.run = async (client, message, args) => {

	if (message.author.id != process.env.OWNERID) return message.channel.send("Only my developer can use this command...");
	message.channel.send(":warning: When database reset, all custom prefix and infos will be deleted! Type `confirm` to confirm! Or being cancelled in `20` seconds.");
	await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {
		max: 1,
		time: 20000,
		errors: ["time"]
	}).then(collected => {
		client.guilds.cache.forEach((guild) => {
		client.settings.delete(guild.id);
		client.settings.ensure(guild.id, settings);
		console.log(`Reset ${guild.name}`);
	})
		})
		.catch(collected => {
			return message.channel.send(":x: | Time's up! Reset Database Failed!");
		});
}

module.exports.help = {
	name: "reset-data",
	description: "This command is used for resetting data.",
	usage: "d!reset-data",
	accessableby: "Bot Owners/Database Manager",
	aliases: []
}