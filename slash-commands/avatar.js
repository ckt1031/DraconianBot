const Discord = require("discord.js");

module.exports = {
	name: "avatar",
	description: "Grab someone's avatar image!",
	commandOptions: [
		{
			type: 6,
			name: "user",
			description: "Type any user you want!",
			required: false,
		},
	],
	execute(interaction) {
		const checkuser = interaction.data.options; // .options[0].value;
		if (checkuser) {
			userid = interaction.data.options[0].value;
		} else {
			userid = interaction.member.user.id;
		}
		// let id = interaction.data.options[0].value
		//	id.replace(/[\\<>@#&!]/g, "");
		const userss = client.users.fetch(userid);
		userss.then(result => {
			const avatar = result.displayAvatarURL({
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
