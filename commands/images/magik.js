const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
	const usernotfind = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} User is not found!`)
		.setColor("RED");

	const target = message.mentions.users.first();
	const attachment = message.attachments.array()[0];

	let imagetarget;
	try {
		imagetarget =
			target ||
			(attachment
				? attachment.url
				: args[0]
				? args[0].length == 18
					? message.guild.members.cache.get(args[0]).user.displayAvatarURL({
							dynamic: false,
							format: "png",
							size: 4096
					  })
					: message.guild.members.cache
							.find(
								r =>
									r.user.username.toLowerCase() ===
									args.join(" ").toLocaleLowerCase()
							)
							.user.displayAvatarURL({
								dynamic: false,
								format: "png",
								size: 4096
							})
				: message.author.displayAvatarURL({
						dynamic: false,
						format: "png",
						size: 4096
				  }));
	} catch (e) {
		return message.channel.send(usernotfind);
	}

	const intensity = 0;

	const serveddrembed = new Discord.MessageEmbed()
		.setDescription("<a:loading:806686528549814344> Generating Image...")
		.setColor("GREEN");

	message.channel.send(serveddrembed).then(async message => {
		await fetch(
			encodeURI(
				`https://nekobot.xyz/api/imagegen?type=magik&image=${imagetarget}&intensity=${intensity}`
			)
		)
			.then(response => response.json())
			.then(data => {
				const attachmentmsg = data.message;
				const embed2 = new Discord.MessageEmbed()
					.setImage(attachmentmsg)
					.setColor("GREEN");
				message.edit(embed2);
			});
	});
};

module.exports.help = {
	name: "magik",
	description: "This command is used for magik.",
	usage: "d!magik",
	accessableby: "Members",
	aliases: []
};
