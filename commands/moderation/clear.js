const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, message, args) => {
	const embed6 = new Discord.MessageEmbed()
		.setDescription(
			`<:cross1:747728200691482746> ${message.author.username}, Missing Permission`
		)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		return message.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	}
	if (!args[0]) {
		return message.channel
			.send("<:no:565766936189861889> Use: **`?clear <1 - 100>`**")
			.then(m => m.delete({ timeout: 7000 }));
	}

	const embedgg = new Discord.MessageEmbed()
		.setColor("RED")
		.setDescription(
			`<:cross1:747728200691482746> You can only clear 1 - 100 message(s) each time!`
		);

	if (args[0] > 100 || args[0] <= 0) return message.channel.send(embedgg);

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("Clear Action")
		.addField("User", `<@${message.author.id}> `)
		.addField("Cleared", `**${args[0]}**`)
		.addField("Channel", `${message.channel} | **${message.channel.name}**`);

	const kntlembed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setDescription(
			`<:tick:702386031361523723> Cleared **${args[0]}** Message here`
		);

	try {
		message.delete();
		message.channel.bulkDelete(args[0]).then(() => {
			message.channel.send(kntlembed).then(m => m.delete({ timeout: 4000 }));
		});
	} catch (e) {
		const embedssss = new Discord.MessageEmbed()
			.setTitle("**Message Clearing**")
			.setDescription(`**Error:** \`\`\`${e}\`\`\``)
			.setColor("RED");

		message.delete();
		return message.channel
			.send(embedssss)
			.then(m => m.delete({ timeout: 7000 }));
	}
};

module.exports.help = {
	name: "clear",
	description: "Clear the message with amount",
	usage: "d!clear <amount>(1-99)",
	accessableby: "Manage Message",
	aliases: [],
};
