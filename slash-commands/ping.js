const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports = {
	name: "ping",
	description: "Ping!",
	commandOptions: null,
	execute(interaction) {
		const bbb = new Discord.MessageEmbed().setDescription(
			`API Latency: **${Math.round(client.ws.ping)}ms**`
		);

		client.api.interactions(interaction.id, interaction.token).callback.post({
			data: {
				type: 4,
				data: {
					embeds: [bbb],
				},
			},
		});
	},
};
