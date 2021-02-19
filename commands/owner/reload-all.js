const Discord = require("discord.js");
const fs = require("fs")
const config = require("../../config.json")

module.exports.run = async (client, message, args) => {
	if (message.author.id != process.env.OWNERID) return message.channel.send("Only my developer can use this command...");

	message.channel.send(":warning: When all commands reloaded, all commands will be turned into latest changes! Type `confirm` to confirm! Or being cancelled in `20` seconds.");
	await message.channel.awaitMessages(m => (m.author.id === message.author.id) && (m.content === "confirm"), {
		max: 1,
		time: 20000,
		errors: ["time"]
	}).then(collected => {
		fs.readdir("../commands/", (err, files) => {

			if (err) return console.log(err);

			files.forEach(file => {

				if (!file.endsWith(".js")) return;

				delete require.cache[require.resolve(`./${file}`)];

				let props = require(`./${file}`);

				console.log("Successfully reloaded " + file)

				let commandName = file.split(".")[0];

				client.commands.set(commandName, props);

			});
			return message.reply("All commands reloaded")

		});
	})
		.catch(collected => {
			return message.channel.send(":x: | Time's up! Reload commands actions cancelled!");
		});


}

module.exports.help = {
	name: "reload-all",
	description: "This command is used for reload all commands without rebooting/restart the bot.",
	usage: "d!reload-all",
	accessableby: "Bot Owners",
	aliases: []
}