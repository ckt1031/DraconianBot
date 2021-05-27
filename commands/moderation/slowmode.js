const Discord = require("discord.js");

exports.run = (client, message, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} Failed to set slowmode in this channel, check your slowmode number!`
		)
		.setColor("RED");

	const notice1 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} Failed to set slowmode in this channel, please enter a valid number!`
		)
		.setColor("RED");

	const noticwsse1 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} Failed to set slowmode in this channel, you can only type in 0 - 21600 second!`
		)
		.setColor("RED");

	const notice22 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} I don't have permission to change channel slowmode!`
		)
		.setColor("RED");

	if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const duration = parseInt(args[0]);
	const mmsssqembed = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} ${message.author.username}, Missing Permission`
		)
		.setColor("#FFFF00");
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(mmsssqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	if (isNaN(duration)) {
		return message.channel.send(notice1);
	}
	if (duration < 0 || duration > 21601) {
		return message.channel.send(noticwsse1);
	}
	message.channel.setRateLimitPerUser(duration).catch(() => {
		message.channel.send(notice3);
	});
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.tick} Set channel's slowmode to **${duration}s** `
		)
		.setColor("GREEN");

	message.channel.send(bsuembed);
};

module.exports.help = {
	name: "slowmode",
	description:
		"This command is used for changing the slowmode as settings page cannot.",
	usage: "d!slowmode <1-21600>",
	accessableby: "Manage Channels",
	aliases: []
};
