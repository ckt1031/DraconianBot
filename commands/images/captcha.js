const Discord = require("discord.js");
const fetch = require("node-fetch");

module.exports.run = async (client, message, args) => {
	const user =
		(await message.mentions.members.first()) ||
		message.guild.members.cache.get(args[0]) ||
		message.guild.members.cache.find(
			r => r.user.username.toLowerCase() === args.join(" ").toLocaleLowerCase()
		) ||
		message.guild.members.cache.find(
			r => r.displayName.toLowerCase() === args.join(" ").toLocaleLowerCase()
		) ||
		message.member;

	const target = message.mentions.users.first();
	const attachmentsss = message.attachments.array()[0];

	const imagetarget =
		target ||
		(attachmentsss
			? attachmentsss.url
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

	let name = user.user.username;
	if (attachmentsss) name = "Cool Stuff";

	const res = await fetch(
		encodeURI(
			`https://nekobot.xyz/api/imagegen?type=captcha&username=${name}&url=${imagetarget}`
		)
	);

	const json = await res.json();
	const attachment = new Discord.MessageAttachment(json.message, "captcha.png");
	message.channel.send(attachment);
};

module.exports.help = {
	name: "captcha",
	description: "This command is used for posting dog's images randomly.",
	usage: "d!captcha",
	accessableby: "Members",
	aliases: []
};
