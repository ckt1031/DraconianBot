

const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    const bbb = new Discord.MessageEmbed()
    .setDescription(`:desktop: Node: **San-Francisco2**\n\nMessage Latency: **${Date.now() - message.createdTimestamp}ms**.\nAPI Latency: **${Math.round(client.ws.ping)}ms**\n\nCheck bot status [here](https://status.koolisw.tk)`)
message.channel.send(bbb)
}

module.exports.help = {
    name: "ping",
    description: "This command is used for pinging the bot.",
    usage: "d!ping",
    accessableby: "Members",
    aliases: []
}
