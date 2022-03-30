const Discord = require("discord.js");
const config = require("../../config/config.json");

module.exports.run = async (client, message, args) => {
	const embed6 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} ${message.author.username}, Missing Permission`
		)
		.setColor("RED");
	const notice3 = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} I don't have permission to unmute people!`)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		return message.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	}
	if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
		return message.channel.send(notice3).then(m => m.delete({ timeout: 5000 }));
	}
	const notice2 = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} You cannot do this for you!`)
		.setColor("RED");

	const mention = message.mentions.users.first();
	const member =
		mention ||
		(args[0]
			? args[0].length == 18
				? message.guild.members.cache.get(args[0]).user
				: false
			: false);

	if (member.id === message.author.id) return message.channel.send(notice2);
	const embed7 = new Discord.MessageEmbed()
		.setTitle("Wrong Usage!")
		.setDescription("Correct Example: d!unmute @RealKoolisw")
		.setColor("RED");
	if (!member) {
		message.delete();
		return message.channel.send(embed7).then(m => m.delete({ timeout: 5000 }));
	}
	const bruhembed = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} **${member.username}#${member.discriminator}** had not been muted!`
		)
		.setColor("RED");

	const muterole = client.guilds.cache
		.get(message.guild.id)
		.roles.cache.find(val => val.name === "Muted");

	// if (!member.roles.cache.has(muterole)) return message.channel.send(bruhembed);

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("Action Unmute")
		.addField("User", `<@${member.id}>`)
		.addField("Executor", `**<@${message.author.id}>**`)
		.setTimestamp()
		.setFooter("• Unmute User Information");
	const embed5 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.tick} Unmuted **${member.username}#${member.discriminator}**`
		)
		.setColor("GREEN");

	const key = `${message.guild.id}-${member.id}`;

	client.moderationdb.ensure(key, {
		guildid: message.guild.id,
		userid: member.id,
		warns: 0,
		isMuted: false,
		timeMuteEnd: 0,
	});

	message.delete();
	await message.guild.member(member).roles.remove(muterole.id);
	await client.moderationdb.set(
		`${message.guild.id}-${member.id}`,
		false,
		"isMuted"
	);
	await client.moderationdb.set(
		`${message.guild.id}-${member.id}`,
		0,
		"timeMuteEnd"
	);
	message.channel.send(embed5);
};

module.exports.help = {
	name: "unmute",
	description: "This command is used for unmuting someone",
	usage: "d!unmute <mention>",
	accessableby: "Manage Roles",
	aliases: [],
};
