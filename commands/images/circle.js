const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
	const target = message.mentions.users.first();
	const attachment = message.attachments.array()[0];

	const usernotfind = new Discord.MessageEmbed()
		.setDescription(`${emojis.cross} User is not found!`)
		.setColor("RED");
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

	//	const avatar = message.attachments.array()[0];
	const image = await canvacord.Canvas.circle(imagetarget);
	const rainbow = new Discord.MessageAttachment(image, "circle.png");
	return message.channel.send(rainbow);
};

module.exports.help = {
	name: "circle",
	description: "Circle the images or avatar",
	usage: "d!circle <mentions>(optional)",
	accessableby: "Member",
	aliases: []
};
