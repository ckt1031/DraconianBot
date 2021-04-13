const Discord = require("discord.js");
const petPetGif = require("pet-pet-gif");

module.exports.run = async (client, message, args) => {
	const target = message.mentions.users.first() || message.author;

	const avatar = message.attachments.array()[0];

	if (avatar) {
		if (avatar.url) {
			const image = await petPetGif(avatar.url);
			const rainbow = new Discord.MessageAttachment(image, "petpet.gif");
			return message.channel.send(rainbow);
		}
	} else {
		const image = await petPetGif(
			target.displayAvatarURL({ dynamic: false, format: "png" })
		);
		const rainbow = new Discord.MessageAttachment(image, "petpet.gif");
		return message.channel.send(rainbow);
	}
};

module.exports.help = {
	name: "petpet",
	description: "Generate Pet Pet pictures.",
	usage: "d!petpet <mentions / attachments>(optional)",
	accessableby: "Member",
	aliases: [],
};
