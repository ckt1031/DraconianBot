const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	return;
	const pollss = args[0];
	const polls = args.slice(1).join(" ");
	const regex = pollss.match(/"[^"]+"|[\\S]+"[^"]+/g);
	const regexs = pollss.match(/"[^"]+"|[\\S]+"[^"]+/g);

	if (!regexs) {
		let i = 0;
		let str1 = "";
		for (const poll of regex) {
			str1 = `${str1}${poll}`;
			i++;
		}
		message.delete();

		const gg = await message.channel.send(
			`:bar_chart: **${str1.replace(/"/g, "")}**`
		);
		return gg.react("👍").then(gg.react("👎"));
	}

	if (!regexs) return message.reply("send something to create a poll");
	if (regex.length > 9) {
		return message.reply("You can only create up to 9 polls");
	}

	let str = "";
	let str1111 = "";
	const emojis = ["1️⃣", "2️⃣", "3️⃣", "4️⃣", "5️⃣", "6️⃣", "7️⃣", "8️⃣", "9️⃣"];
	let i = 0;
	for (const poll of regex) {
		str = `${str}${emojis[i]} ${poll}\n`;
		i++;
	}

	for (const polsl of regexs) {
		str1111 = `${str1111}${polsl}`;
		i++;
	}

	const embed = new Discord.MessageEmbed().setDescription(
		`\n${str.replace(/"/g, "")}`
	);
	const msg = await message.channel.send(
		`:bar_chart: **${str1111.replace(/"/g, "")}**`,
		embed
	);
	message.delete();
	for (let i = 0; i < regex.length; i++) {
		msg.react(emojis[i]);
	}
};

module.exports.help = {
	name: "poll",
	description: "This command is used for embedding stuff in discord",
	usage: "d!poll <something>",
	accessableby: "Member",
	aliases: []
};
