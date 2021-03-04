const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");

module.exports.run = async (client, message, args) => {
	if (message.author.id != process.env.OWNERID)
		return message.channel.send("Only my developer can use this command...");

	message.channel.send(
		":warning: When all commands reloaded, all commands will be turned into latest changes! Type `confirm` to confirm! Or being cancelled in `20` seconds."
	);
	await message.channel
		.awaitMessages(
			m => m.author.id === message.author.id && m.content === "confirm",
			{
				max: 1,
				time: 20000,
				errors: ["time"],
			}
		)
		.then(collected => {
			const folders = fs.readdirSync("./commands/");
			for (const files of folders) {
				const folder = fs
					.readdirSync(`./commands/${files}/`)
					.filter(file => file.endsWith(".js"));
				for (const commands of folder) {
					const command = require(`../../commands/${files}/${commands}`);

					delete require.cache[require.resolve(`../${files}/${commands}`)];
					client.aliases.delete(command.help.aliases);
					let commandName = commands.split(".")[0];
					console.log("Reloaded Command: " + commands);
					client.commands.set(commandName, command);
					command.help.aliases.forEach(alias => {
						client.aliases.set(alias, commandName);
					});
				}
			}
			return message.channel.send(`command reloaded`);
		})
		.catch(collected => {
			return message.channel.send(
				":x: | Time's up! Reload commands actions cancelled!"
			);
		});
};

module.exports.help = {
	name: "reload-all",
	description:
		"This command is used for reload all commands without rebooting/restart the bot.",
	usage: "d!reload-all",
	accessableby: "Bot Owners",
	aliases: [],
};
