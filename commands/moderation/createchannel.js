const Discord = require("discord.js");

module.exports.run = async (client, message, args) => { 

	let notice3 = new Discord.MessageEmbed()
		.setDescription(
			`<:cross1:747728200691482746> **I don't have permission to manage channel!**`
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
		return message.channel.send(notice3).then(msg => msg.delete({ timeout: 5000 }));
	try {
		let embed6 = new Discord.MessageEmbed()
			.setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`)
			.setColor('RED')
		if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed6).then(msg => msg.delete(5000));
		if (!args[1]) return message.reply('You need to input the channel type!');
		if (!args[0]) return message.reply('You need to input the channel name!');

		message.channel.send('I\'ve created the channel!').then(() => {
			message.guild.channels.create(args[1], args[0], []).catch((err) => {
				message.channel.send('There was an error!')
			});
		});
	} catch (err) {
		message.channel.send('There was an error!\n' + err).catch();
	}
};


module.exports.help = {
	name: "createchannel",
	description: "Create channel easily with commands",
	usage: "d!createchannel <name> <type: text/voice>",
	accessableby: "Manage Channels",
	aliases: []
} 