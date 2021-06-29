const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
	let reason = args.slice(1).join(" ");
	//	const user = message.mentions.users.first();
	const warninguser = message.mentions.users.first();
	const user =
		warninguser ||
		(args[0]
			? args[0].length == 18
				? message.guild.members.cache.get(args[0]).user
				: false
			: false);

	const notice1 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} ${message.author.username}, Missing Permission`
		)
		.setColor("RED");

	const notice3 = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} I don't have permission to warn people!`)
		.setColor("RED");

	const notice333 = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} You must mention someone to warn him/her!`)
		.setColor("RED");
	if (
		!message.guild
			.member(client.user)
			.hasPermission(["MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS"])
	) {
		return message.channel
			.send(notice3)
			.then(m => m.delete({ timeout: 15000 }));
	}
	if (!message.member.hasPermission("KICK_MEMBERS")) {
		return message.channel
			.send(notice1)
			.then(m => m.delete({ timeout: 15000 }));
	}

	if (!user) {
		return message.channel.send(notice333).catch(console.error);
	}

	const notice2 = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} You cannot warn yourself`)
		.setColor("RED");

	if (user.id === message.author.id) {
		return message.channel
			.send(notice2)
			.then(m => m.delete({ timeout: 15000 }));
	}

	if (reason.length < 1) reason = "No reason given.";

	const key = `${message.guild.id}-${user.id}`;

	const dsfdsfsdf = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} Access Denied, that member has roles higher or equal to you!`
		)
		.setColor("RED");
	const sdfsdfsdfsd = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.cross} Access Denied, **that member has roles higher or equal to me!`
		)
		.setColor("RED");
	const botRolePossition = message.guild.member(client.user).roles.highest
		.position;
	const rolePosition = message.guild.member(user).roles.highest.position;
	const userRolePossition = message.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return message.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition)
		return message.channel.send(sdfsdfsdfsd);

	client.moderationdb.ensure(key, {
		guildid: message.guild.id,
		userid: user.id,
		warns: 0,
		isMuted: false,
		timeMuteEnd: 0
	});
	client.moderationdb.inc(key, "warns");

	const test1 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.tick} Muted **${user.username}#${user.discriminator}** For 1 Hour | **Reached Two Warnings**`
		)
		.setColor("GREEN");
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.tick} Warned **${user.username}#${user.discriminator}** | **${reason}**`
		)
		.setColor("GREEN");

	message.delete();
	message.channel.send(bsuembed);
	user.send(
		`You are warned in **${
			message.guild.name
		}** (Total Warning(s): \`${client.moderationdb.get(
			key,
			"warnings"
		)}\` ), **${reason}**`
	);

	const test2 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.tick} Kicked **${user.username}#${user.discriminator}** | **Reached Warnings 3**`
		)
		.setColor("GREEN");

	const test3 = new Discord.MessageEmbed()
		.setDescription(
			`${emojis.tick} Banned **${user.username}#${user.discriminator}** | **Reached 5 Warnings**`
		)
		.setColor("GREEN");

	if (client.moderationdb.get(key, "warns") == 2) {
		const muteRole = client.guilds.cache
			.get(message.guild.id)
			.roles.cache.find(val => val.name === "Muted");

		const mutetime = "60s";
		message.guild.members.cache.get(user.id).roles.add(muteRole.id);
		message.channel.send(test1);

		setTimeout(() => {
			message.guild.members.cache.get(user.id).roles.remove(muteRole.id);
		}, ms(mutetime));
	}

	if (client.moderationdb.get(key, "warns") == 3) {
		message.guild.member(user).kick(reason);
		message.channel.send(test2);
	}

	if (client.moderationdb.get(key, "warns") >= 5) {
		message.guild.member(user).ban(reason);
		message.channel.send(test3);
	}
};

module.exports.help = {
	name: "warn",
	description:
		"Warn someone u hates/againsting rules, 2 warn for muting, 3 warns for kicking, 5 warns for banning",
	usage: "d!warn <mention> <reason>",
	accessableby: "Member",
	aliases: []
};
