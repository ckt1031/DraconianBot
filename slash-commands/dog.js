const Discord = require("discord.js");
const request = require("request");

module.exports = {
	name: "dog",
	description: "Generate cool dog images!",
	commandOptions: null,
	execute(interaction) {
		request("https://some-random-api.ml/img/dog", (error, _response, body) => {
			const json = JSON.parse(body);
			const { link } = json;

			const emb = new Discord.MessageEmbed();
			emb.setDescription("Your Dog Image Here:");
			emb.setColor("GREEN");
			emb.setImage(link);

			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [emb],
					},
				},
			});
		});
	},
};
