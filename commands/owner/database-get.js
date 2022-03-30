const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	const rightNow = Date.now();
	if (message.author.id != process.env.OWNERID)
		return message.channel.send("Only my developer can use this command...");
	const user = message.mentions.users.first();
	if (!user) message.reply(`Please mention someone to get data`);
	const dbss = client.moderationdb.get(`${message.guild.id}-${user.id}`);
	const notice2 = new Discord.MessageEmbed()
		.setDescription(
			`USER: \`${dbss.userid}\`\nWarnings: \`${dbss.warns}\`\nisMuted: \`${dbss.isMuted}\`\nTight Now: \`${rightNow}\`\ntimeMuteEnd: \`${dbss.timeMuteEnd}\``
		)
		.setColor("GREEN");
	message.channel.send(notice2);
};

module.exports.help = {
	name: "database-get",
	description: "N/A",
	usage: "d!database-get",
	accessableby: "Bot Owners",
	aliases: [],
};
