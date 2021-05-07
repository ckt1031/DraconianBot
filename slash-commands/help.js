const Discord = require("discord.js");

module.exports = {
	name: "help",
	description: "Learn more about me!",
	commandOptions: [
		{
			type: 3,
			name: "command",
			description: "Type any command you want to ask for!",
			required: false,
		},
	],
	execute(interaction) {

		try {
			let command = interaction.data.options[0].value;
			if (client.commands.has(command)) {
				command = client.commands.get(command);
				let alia = command.help.aliases;
				if (command.help.aliases < 1) alia = "No aliases";
				const embed = new Discord.MessageEmbed()
					.setTitle(`**Command: ${command.help.name}**`)
					.setDescription(
						`
            **Description:**\n\`\`\`${command.help.description
						|| "There is no Description for this command."
						}\`\`\`\n**Usage:**\n\`\`\`${command.help.usage || "No Usage"
						}\`\`\`\n**Permissions:**\n\`\`\`${command.help.accessableby || "Members"
						}\`\`\`\n**Aliases:**\n\`\`\`${alia}\`\`\``,
					)
					.setColor("#4a4b4d")
					.setFooter(
						`©2021 Draconian Workshop`,
					);
				return client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							embeds: [embed],
						},
					},
				});

			}

			if (!client.commands.has(command)) {
				const embeds = new Discord.MessageEmbed()
					.setTitle(`**Command: ${helpArgs[0]}**`)
					.setDescription(
						`
            **Response:**
						\`\`\`Error: 404 Not Found\`\`\``,
					)
					.setColor("#ff0000");

				return client.api.interactions(interaction.id, interaction.token).callback.post({
					data: {
						type: 4,
						data: {
							embeds: [embeds],
						},
					},
				});
			}

		} catch (e) {

			const embed = new Discord.MessageEmbed()
				.setTitle("DraconianBot Help & Commands list")
				.setColor("GREEN")
				.setDescription(
					"**prefix** `d!`\nMore Info please visit: [Here](https://top.gg/bot/711937599975063584) and invite me to your server.",
				)
				.addField("**📱Basic**", "`help`, `ping`, `vote`, `uptime`")
				.addField(
					"**⚙utility**",
					"`aes256`, `avatar`, `channel`, `embed`, `roleinfo`, `reverse`, `setafk`, `snipe`, `stats`, `timer`, `translate`, `whois`, `weather`, `youtube`",
				)
				.addField(
					"**🎃Fun**",
					"`8ball`, `cat`, `deaes256`, `kiss`, `meme`, `ngif`, `pat`, `poke`, `smug`, `spank`, `thigh`, `tickle`",
				)
				.addField(
					"**:tada:Giveaways**",
					"`start-giveaway`, `reroll`, `end-giveaway`",
				)
				.addField(
					"**:frame_photo:Image**",
					"`circle`, `delete`, `gay`, `changemymind`, `trigger`, `clyde`, `petpet`",
				)
				.addField(
					"**:musical_note:Music**",
					"`play`, `stop`, `skip`, `queue`, `autoplay`, `loop`, `volume`, `pause`, `resume`",
				)
				.addField(
					"**🛠️Moderation**",
					"`addrole`, `ban`, `clear`, `clearwarn`, `createchannel`, `createemoji`, `kick`, `lockchannel`, `mute`, `rename`, `slowmode`, `unban`, `unlockchannel`, `unmute`, `warn`, `warnings`",
				)
				.addField(
					"**:underage:NSFW**",
					"`4knsfw`, `anal`, `ass`, `hentai`, `holo`, `pussy`, `porn`, `spank`, `urban`",
				)
				.addField("**:gear:Custom Function**", "`setprefix`")
				.setFooter(
					`©2021 Draconian Workshop`,
				);

			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [embed],
					},
				},
			});

		}

	}
};