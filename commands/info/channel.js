const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
	const channelinfo = message.mentions.channels.first() || message.channel;

	const nsfwinf = channelinfo.nsfw ? "Non-NSFW" : "NSFW";
	const parentV = channelinfo.parent
		? channelinfo.parent
		: "No parent category";
	const topicV = channelinfo.topic
		? channelinfo.topic
		: "No topic for this channel";
	const embed = new Discord.MessageEmbed()
		.setTitle(`Channel Information: ${channelinfo.name}`)
		.setDescription(
			`Topic: ${topicV}\nType: ${nsfwinf}\nCategory: ${parentV}\nPosition: ${channelinfo.position}\nChannel ID: ${channelinfo.id}`
		)
		.setColor("GREEN");

	return message.channel.send(embed);
};

module.exports.help = {
	name: "channel",
	description: "Checking channel status.",
	usage: "d!channel <channel-mentions>(optional)",
	accessableby: "Member",
	aliases: [],
};
