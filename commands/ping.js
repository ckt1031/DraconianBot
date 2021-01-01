

const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    
    const bbb = new Discord.MessageEmbed()
    .setDescription(`🏓Latency: **${Date.now() - message.createdTimestamp}ms**.\n\nAPI Latency: **${Math.round(client.ws.ping)}ms** `)
message.channel.send(bbb)
}


module.exports.help = {
  name: "ping"
}
