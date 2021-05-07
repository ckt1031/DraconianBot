const Discord = require("discord.js");

module.exports = {
	name: "snipe",
	description: "Snipe those deleted messages!",
	commandOptions: null,
	execute(interaction) {
		const msg = client.snipes.get(interaction.channel_id);
		if (!msg) {
			return client.api
				.interactions(interaction.id, interaction.token)
				.callback.post({
					data: {
						type: 4,
						data: {
							content: `There is no any delete message here`,
						},
					},
				});
		}
		const embed = new Discord.MessageEmbed()
			.setAuthor(msg.author)
			.setDescription(msg.content);
		if (msg.image) embed.setImage(msg.image);

		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [embed],
				},
			},
		});
	},
};
