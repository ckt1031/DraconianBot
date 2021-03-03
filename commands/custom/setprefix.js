const Discord = require("discord.js");
const fs = require("fs");
const settings = require("../../settings.json")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Missing Permission!");
  
    client.settings.ensure(message.guild.id, settings);
    
    if(!args[0]) return message.channel.send("Please type the prefix you want to set to")
    
    client.settings.set(message.guild.id, args[0], "prefix");
    
    // We can confirm everything's done to the client.
    message.channel.send(`My command prefix has been changed to: ${args[0]}`);
}

module.exports.help = {
    name: "setprefix",
    description: "This command is used for changing the prefix.",
    usage: "d!setprefix <value>",
    accessableby: "Manage Server",
    aliases: []
}