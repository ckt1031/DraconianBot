const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let helpArray = message.content.split(" ");
	let helpArgs = helpArray.slice(1);


	if (!helpArgs[0]) {
		const embed = new Discord.MessageEmbed()
			.setTitle("DraconianBot Help & Commands list")
			.setColor("GREEN")
			.setDescription(
				"**prefix** `d!`\nMore Info please visit: [Here](https://top.gg/bot/711937599975063584) and invite me to your server.\n**Important reminder:** Follows to Discord official Terms of Service, we will no longer saving your data for a long term, if your server keep not using our bot for **2** months, we will delete all data from our bot databases, all data will be kept in default. **If wanted to delete all data from your server in our bot database**, just kick the bot and it will be removed automaticly\n\nTo get more info about a command send d!!help <command name>\n\`\`\`d!help kick\`\`\`"
			)
			.addField("**📱Basic**", "`help`, `ping`, `vote`, `uptime`")
			.addField(
				"**⚙utility**",
				"`aes256`, `avatar`, `channel`, `embed`, `roleinfo`, `reverse`, `setafk`, `snipe`, `stats`, `timer`, `translate`, `whois`, `weather`, `youtube`"
			)
			.addField(
				"**🎃Fun**",
				"`8ball`, `cat`, `deaes256`, `kiss`, `meme`, `ngif`, `pat`, `poke`, `smug`, `spank`, `thigh`, `tickle`"
			)
			.addField("**:tada:Giveaways**", "`start-giveaway`, `reroll`, `end-giveaway`")
			.addField("**:frame_photo:Image**", "`circle`, `delete`, `gay`, `changemymind`, `trigger`, `clyde`")
			.addField("**:musical_note:Music**", "`play`, `stop`, `skip`, `queue`, `autoplay`, `loop`, `volume`, `pause`, `resume`")
			.addField(
				"**🛠️Moderation**",
				"`addrole`, `ban`, `clear`, `clearwarn`, `createchannel`, `createemoji`, `kick`, `lockchannel`, `mute`, `rename`, `slowmode`, `unban`, `unlockchannel`, `unmute`, `warn`, `warnings`"
			)
			.addField("**:underage:NSFW**", "`4knsfw`, `anal`, `ass`, `hentai`, `holo`, `pussy`, `porn`, `spank`, `urban`")
			.addField("**:gear:Custom Function**", "`setprefix`")
			.setFooter(
				`©2021 Draconian Workshop | This command requested by ${message.author.username}#${message.author.discriminator}`
			)
		message.channel.send({ embed });
	}

	if (helpArgs[0]) {
		let command = helpArgs[0];

		if (bot.commands.has(command)) {

			command = bot.commands.get(command);
			let alia = command.help.aliases
			if (command.help.aliases < 1) alia = "No aliases";
			
			var embed = new Discord.MessageEmbed()
				.setTitle(`**Command: ${command.help.name}**`)
				.setDescription(`
            **Description:**\n\`\`\`${command.help.description || "There is no Description for this command."}\`\`\`\n**Usage:**\n\`\`\`${command.help.usage || "No Usage"}\`\`\`\n**Permissions:**\n\`\`\`${command.help.accessableby || "Members"}\`\`\`\n**Aliases:**\n\`\`\`${alia}\`\`\``)
				.setColor('#4a4b4d')
				.setFooter(
				`©2021 Draconian Workshop | This command requested by ${message.author.username}#${message.author.discriminator}`
			)

			message.channel.send(embed);
		} else {
			var embeds = new Discord.MessageEmbed()
.setTitle(`**Command: ${helpArgs[0]}**`)
				.setDescription(`
            **Response:**
						\`\`\`Error: 404 Not Found\`\`\``)
				.setColor('#ff0000')
   
			return message.channel.send(embeds)
		}
	}

};

module.exports.help = {
	name: "help",
	description: "This command is used for displaying all commands.",
	usage: "d!help",
	accessableby: "Members",
	aliases: []
}