const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {

	let notice3 = new Discord.MessageEmbed()
		.setDescription(
			`<:cross1:747728200691482746> **I don't have permission to create emoji!**`
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_EMOJIS"))
		return message.channel.send(notice3).then(msg => msg.delete({ timeout: 5000 }));
	try {
		let embed6 = new Discord.MessageEmbed()
			.setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`)
			.setColor('RED')
		if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(embed6).then(msg => msg.delete(5000));
		let emoji = message.attachments.array()[0] || args[0];

		if (emoji) {
			if (emoji.url) {
				if (args[0]) {
					message.guild.emojis.create(emoji.url, args[0])
						.then(emoji => message.channel.send('I\'ve created the ' + emoji.name + ' emoji!'))
						.catch(err => message.reply('I couldn\'t create the emoji!\n' + err));
				} else message.reply('You need to put the name for the emoji in!');
			} else {
				if (args[1]) {
					message.guild.emojis.create(emoji, args[1])
						.then(emoji => message.channel.send('I\'ve created the ' + emoji.name + ' emoji!'))
						.catch(err => message.reply('I couldn\'t create the emoji!\n' + err));
				} else message.reply('You need to put the name for the emoji in!');
			}

		} else message.reply('You need to give the image for the emoji!');
	} catch (err) {
		message.channel.send('There was an error!\n' + err).catch();
	}
};

module.exports.help = {
	name: "createemoji",
	description: "Create emoji easily with commands",
	usage: "d!createemoji <name> <attachments>",
	accessableby: "Manage Emojis",
	aliases: []
} 
