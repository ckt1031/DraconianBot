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
							size: 4096,
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
								size: 4096,
							})
				: message.author.displayAvatarURL({
						dynamic: false,
						format: "png",
						size: 4096,
				  }));
	} catch (e) {
		return message.channel.send(usernotfind);
	}

	const res = await fetch(
		encodeURI(
			`https://nekobot.xyz/api/imagegen?type=iphonex&url=${imagetarget}`
		)
	);

	const json = await res.json();
	const attachmentmsg = new Discord.MessageAttachment(
		json.message,
		"iphonex.png"
	);
	message.channel.send(attachmentmsg);
};

module.exports.help = {
	name: "iphonex",
	description: "This command is used for posting dog's images randomly.",
	usage: "d!iphonex",
	accessableby: "Members",
	aliases: [],
};
