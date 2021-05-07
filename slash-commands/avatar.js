const Discord = require("discord.js");

module.exports = {
	name: "avatar",
	description: "Grab someone's avatar image!",
	commandOptions: [
		{
			type: 6,
			name: "user",
			description: "Type any user you want!",
			required: true,
		},
	],
	execute(interaction) {
		// let id = interaction.data.options[0].value
		//	id.replace(/[\\<>@#&!]/g, "");
		let userss = client.users.fetch(interaction.data.options[0].value);

		userss.then(function (result) {
			const avatar = result.avatarURL({
				format: "png",
				dynamic: true,
				size: 4096,
			});
			const embed = new Discord.MessageEmbed()
				.setColor("GREEN")
				.setTitle(`Avatar for ${result.username}:`)
				.setImage(`${avatar}`);

			client.api.interactions(interaction.id, interaction.token).callback.post({
				data: {
					type: 4,
					data: {
						embeds: [embed],
					},
				},
			});
		});
	},
};
