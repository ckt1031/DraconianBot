const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {


	let avatar = message.attachments.array()[0].url
	if (!avatar) return message.channel.send("Missing Image")
	let rainbow = new Discord.MessageAttachment(avatar, "image.png")
	return message.channel.send(rainbow);
}

module.exports.help = {
    name: "send-image",
    description: "This command is used for resending the images.",
    usage: "d!send-image <attachments>",
    accessableby: "Member",
    aliases: []
}