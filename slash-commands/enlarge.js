const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports = {
	name: "enlarge",
	description: "Enlarge any emoji!",
	commandOptions: [
		{
			type: 3,
			name: "Emoji",
			description: "Type any emoji you want!",
			required: true,
		},
	],
	execute(interaction) {
		try {
			const custom = Discord.Util.parseEmoji(interaction.data.options[0].value);
			const embed = new Discord.MessageEmbed()
				.setTitle(`Enlarged version of ${interaction.data.options[0].value}`)
				.setColor("#FFFF00");

			const parsed = parse(interaction.data.options[0].value, {
				assetType: "png",
			});

			if (custom.id) {
				embed.setImage(
					`https://cdn.discordapp.com/emojis/${custom.id}.${
						custom.animated ? "gif" : "png"
					}`
				);
				return client.api
					.interactions(interaction.id, interaction.token)
					.callback.post({
						data: {
							type: 4,
							data: {
								embeds: [embed],
							},
						},
					});
			}

			if (!parsed[0]) {
				return client.api
					.interactions(interaction.id, interaction.token)
					.callback.post({
						data: {
							type: 4,
							data: {
								embeds: "Invalid emoji!",
							},
						},
					});
			}

			embed.setImage(parsed[0].url);

			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [embed],
					},
				},
			});
		} catch (e) {
			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					flags: 1 << 6,
					data: {
						content: "Error occured when getting requested emoji",
					},
				},
			});
		}
	},
};
