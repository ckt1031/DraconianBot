const fetch = require("node-fetch");
const Discord = require("discord.js");
const weather = require("weather-js");

module.exports = {
	name: "weather",
	description: "Search weather by everywhere you typed easily!",
	commandOptions: [
		{
			type: 3,
			name: "location",
			description: "Location for you to search it's weather",
			required: true,
		},
	],
	execute(interaction) {
		weather.find(
			{ search: `${interaction.data.options[0].value}`, degreeType: "C" },
			(err, result) => {
				const { current } = result[0]; // Variable for the current part of the JSON Output
				const { location } = result[0]; // This is a variable for the location part of the JSON Output

				// Sends weather log in embed
				const embed = new Discord.MessageEmbed()
					.setDescription(`**${current.skytext}**`) // How the sky looks like
					.setAuthor(`Weather for ${current.observationpoint}`) // Shows the current location of the weater
					.setThumbnail(current.imageUrl) // Sets thumbnail of the embed
					.setColor(0x00ae86) // Sets the color of the embed
					.addField("Time Zone", `UTC${location.timezone}`, true) // Shows the timezone
					.addField("Degree Type", location.degreetype, true) // Shows the degrees in Celcius
					.addField("Temperature", `${current.temperature}`, true)
					.addField("Feels like", `${current.feelslike} Degrees`, true)
					.addField("Wind speed", current.winddisplay, true)
					.addField("Wet Rate", ` ${current.humidity}%`, true)
					.addField("Week", `${current.day}`, true)
					.addField("Date", `${current.date}`, true);

				client.api
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
		);
	},
};
