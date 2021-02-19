const Discord = require("discord.js");

exports.run = (client, message, args) => {
    let notice3 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **I don't have permission to manage channel!**`
    )
    .setColor("RED");
    let dfgrdgdfgdf = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> **Lockdown lifted**`
    )
    .setColor("GREEN");
  
  if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(notice3).then(msg => msg.delete({timeout: 5000}));
    let mmqembed = new Discord.MessageEmbed()
    .setDescription(
      `:no_entry_sign: ${message.author.username}, Missing Permission`
    )
    .setColor("RED");
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel.send(mmqembed).then(msg => msg.delete({timeout: 5000}));
    
  if (!client.lockit) client.lockit = [];
  //if (!message.member.hasPermission("MANAGE_CHANNELS")) return msg.reply("❌**Error:** You don't have the permission to do that!");

    message.channel.createOverwrite(message.guild.id, {
      SEND_MESSAGES: true
    }).then(() => {
      message.channel.send(dfgrdgdfgdf);
      delete client.lockit[message.channel.id];
    }).catch(error => {
      console.log(error);
    })
  };

module.exports.help = {
    name: "unlockchannel",
    description: "This command is used for unlockchanneling",
    usage: "d!unlockchannel",
    accessableby: "Manage Channels",
    aliases: []
}
