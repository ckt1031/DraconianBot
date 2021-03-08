const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = (client, message, args) => {
	const reason = args.slice(1).join(" ");
	const user = args[0];

	const embed1 = new Discord.MessageEmbed()
		.setTitle("Error")
		.setDescription("**The user you entered has not been banned!**")
		.setColor("RED");
	const embed2 = new Discord.MessageEmbed()
		.setDescription("you must supply a `UserResolvable`, i.e. a user ID.")
		.setColor("RED");
	const userID = args[0];
	message.guild.fetchBans().then(bans => {
		if (bans.size == 0) {
			return message.channel
				.send(embed1)
				.then(m => m.delete({ timeout: 15000 }));
		}
		const bUser = bans.find(b => b.user.id == userID);
		if (!bUser) {
			return message.channel
				.send(embed2)
				.then(m => m.delete({ timeout: 15000 }));
		}
		const EMDDD = new Discord.MessageEmbed()
			.setDescription(`<:tick:702386031361523723> **Unbanned** **${args[0]}**`)
			.setColor("#FFFF00");
		message.channel.send(EMDDD);
		message.guild.members.unban(bUser.user);
	});
};

module.exports.help = {
	name: "unban",
	description: "This command is used for unbanning someone",
	usage: "d!unban <USER ID>",
	accessableby: "Ban Members",
	aliases: [],
};
