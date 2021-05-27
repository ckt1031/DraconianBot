const Discord = require("discord.js");

function checkDays(date) {
	const now = new Date();
	const diff = now.getTime() - date.getTime();
	const days = Math.floor(diff / 86400000);
	return `${days + (days == 1 ? " day" : " days")} ago`;
}
module.exports.run = async (client, message, args) => {
	const verifLevels = ["None", "Low", "Medium", "High", "Highest"];
	const region = {
		brazil: "Brazil",
		"eu-central": "Central Europe",
		singapore: "Singapore",
		"us-central": "U.S. Central",
		sydney: "Sydney",
		"us-east": "U.S. East",
		"us-south": "U.S. South",
		"us-west": "U.S. West",
		"eu-west": "Western Europe",
		"vip-us-east": "VIP U.S. East",
		london: "London",
		amsterdam: "Amsterdam",
		hongkong: "Hong Kong"
	};

	let emojis;
	if (message.guild.emojis.cache.size === 0) {
		emojis = "None";
	} else {
		emojis = message.guild.emojis.cache.size;
	}

	const embed = new Discord.MessageEmbed()
		.setAuthor(
			message.guild.name,
			message.guild.iconURL()
				? message.guild.iconURL()
				: client.user.displayAvatarURL()
		)
		.setThumbnail(message.guild.iconURL())
		.setDescription(
			`**Created On:** ${message.guild.createdAt
				.toString()
				.substr(0, 15)} (${checkDays(message.guild.createdAt)})\n**ID:** ${
				message.guild.id
			}\n**Owner:** ${message.guild.owner.user.username}#${
				message.guild.owner.user.discriminator
			}\n**Region:** ${region[message.guild.region]}\n**Boosts:** ${
				message.guild.premiumSubscriptionCount
			}\n**User Count:** ${message.guild.memberCount}\n**Member Count:** ${
				message.guild.members.cache.filter(m => !m.user.bot).size
			}\n**Bot Count:** ${
				message.guild.members.cache.filter(m => m.user.bot).size
			}\n**AFK Timeout:** ${
				message.guild.afkTimeout / 60
			} minutes\n**Roles:** ${message.guild.roles.cache.size}\n**Channels:** ${
				message.guild.channels.cache.size
			}\n**Emojis:** ${emojis}\n**Verification Level:** ${
				message.guild.verificationLevel
			}`
		)

		// premiumSubscriptionCount
		.setColor(Math.floor(Math.random() * 16777215));
	message.channel.send({ embed });
};

module.exports.help = {
	name: "serverinfo",
	description: "This command is used for checking the server info.",
	usage: "d!serverinfo",
	accessableby: "Member",
	aliases: []
};
