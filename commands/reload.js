const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

exports.run = async (client, message, args) => {
if (message.author.id != process.env.OWNERID) return message.channel.send("Only my developer can use this command...");
        message.channel.send("Developer command confirmed!");

    if (!args.length) return message.channel.send(`You didn't pass any command to reload, ${message.author}!`);
const commandName = args[0].toLowerCase();
const command = message.client.commands.get(commandName)
	|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

if (!command) return message.channel.send(`There is no command with name or alias \`${commandName}\`, ${message.author}!`);
    
    delete require.cache[require.resolve(`./${args[0]}.js`)];

        try {
	const newCommand = require(`./${args[0]}.js`);
	message.client.commands.set(newCommand.name, newCommand);
} catch (error) {
	console.error(error);
	message.channel.send(`There was an error while reloading a command \`${args[0]}\`:\n\`${error.message}\``);
}
return message.reply("Command reloaded")
}

module.exports.help = {
    name: "reload",
    description: "This command is used for reload specify commands without rebooting/restart the bot.",
    usage: "d!reload <commands>",
    accessableby: "Bot Owners",
    aliases: []
}