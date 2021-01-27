const Discord = require("discord.js");
const settings = require('../settings.js');

exports.run = async (client, message, args) => {
	if (message.author.id != process.env.OWNERID) return message.channel.send("Only my developer can use this command...");
	client.guilds.cache.forEach((guild) => {
		client.settings.delete(guild.id);
		client.settings.ensure(guild.id, settings);
		console.log(`Reset ${guild.name}`)
	})

}

module.exports.help = {
    name: "reset-data",
    description: "This command is used for resetting data.",
    usage: "d!reset-data",
    accessableby: "Bot Owners/Database Manager",
    aliases: []
}