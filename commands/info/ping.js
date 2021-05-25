const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	const bbb = new Discord.MessageEmbed().setDescription(
		`Message Latency: **${
			Date.now() - message.createdTimestamp
		}ms**\nDiscord API Latency: **${Math.round(client.ws.ping)}ms**`
	);
	message.channel.send(bbb);
};

module.exports.help = {
	name: "ping",
	description: "This command is used for pinging the bot.",
	usage: "d!ping",
	accessableby: "Members",
	aliases: [],
};
