const Discord = require("discord.js");
const canvacord = require("canvacord");

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

	const image = await canvacord.Canvas.delete(imagetarget);
	const rainbow = new Discord.MessageAttachment(image, "delete.png");
	return message.channel.send(rainbow);
};

module.exports.help = {
	name: "delete",
	description:
		"This command is used for delete someone u hates with windows trash bin",
	usage: "d!delete [<mention> or <attachments>]",
	accessableby: "Member",
	aliases: []
};
