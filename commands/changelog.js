const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	const embed = new Discord.MessageEmbed()
			.setTitle("DraconianBot Help & Commands list")
			.setColor("GREEN")
			.setDescription(
				"**Here's the current change log from our bot:**"
			)
			.addField("**v2.1-2021**", "`help`, `ping`, `vote`, `uptime`")
			.setFooter(
				`©2021 Draconian Workshop | This command requested by ${message.author.username}#${message.author.discriminator}`
			)
		message.channel.send(embed);
}