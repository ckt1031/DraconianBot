const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
	const trufal = {
		true: "Robot",
		false: "Human",
	};

	// let user;

	const usernotfind = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} User is not found!`)
		.setColor("RED");

	const rankuser = message.mentions.users.first();
	let user;
	try {
		user =
			rankuser ||
			(message.mentions.users.first()
				? message.mentions.users.first()
				: args[0]
				? args[0].length == 18
					? message.guild.members.cache.get(args[0]).user
					: message.guild.members.cache.find(
							r =>
								r.user.username.toLowerCase() ===
								args.join(" ").toLocaleLowerCase()
					  ).user
				: message.author);
	} catch (e) {
		return message.channel.send(usernotfind);
	}

	let userguild = message.guild.member(user);
	const member = message.guild.member(user);
	const roles = member.roles.cache.map(r => `${r}`).join(", ");
	const serveddrembed = new Discord.MessageEmbed()
		.setDescription("<a:loading:806686528549814344> Fetching Userinfo...")
		.setColor("RED");

	message.channel.send(serveddrembed).then(async message => {
		const embed = new Discord.MessageEmbed()
			.setColor(user.displayHexColor)
			.setAuthor(
				`${user.tag} User Information`,
				user.displayAvatarURL({ dynamic: false, format: "png", size: 4096 })
			)
			.setDescription(
				`**Name: **${user.tag}\n**ID: **${
					user.id
				}\n**Status: **${user.presence.status.toUpperCase()}\n**• Game: **${
					user.presence.game
						? user.presence.game.name
						: "I do not see him playing anything!"
				}\n**Account Type: **${trufal[user.bot]}\n**Joined At: **${moment(
					userguild.joinedAt
				).format("DD-MM-YYYY")}\n**Created at: ** ${moment(
					user.createdAt
				).format(
					"DD-MM-YYYY"
				)}\n**Avatar**: [Click here](${user.displayAvatarURL({
					dynamic: false,
					format: "png",
					size: 4096,
				})})\n**Roles: **${roles}`
			)

			.setThumbnail(
				`${user.displayAvatarURL({
					dynamic: false,
					format: "png",
					size: 4096,
				})}`
			)
			.setTimestamp();

		await message.edit(embed);
	});
};

module.exports.help = {
	name: "whois",
	description: "Check who is him/her",
	usage: "d!whois <mention or keep blank>",
	accessableby: "Members",
	aliases: [],
};
