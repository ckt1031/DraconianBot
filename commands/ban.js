const Discord = require("discord.js");
const fs = require('fs');
const config = require("../config.json");

exports.run = async(client, msg, args) => {

 let logs = msg.guild.channels.cache.find(x => x.name = config.logsChannel);

  let banTaged = msg.mentions.users.first();
  let reason = args.slice(1).join(' ');
  
  let mmqembed = new Discord.MessageEmbed()
  .setDescription(`:no_entry_sign: ${msg.author.username}, Missing Permission`)
  .setColor('#FFFF00')
  if (!msg.member.hasPermission("BAN_MEMBERS")) return msg.channel.send(mmqembed).then(msg=>msg.delete(5000));
  
  let kntlembed = new Discord.MessageEmbed()
  .setTitle("Command: +ban")
  .setDescription("Wrong Usage!。\n\n**Function:** Ban a member\n**Usage:** +ban [User] [Reason]\n**Example:** +ban @RealKoolisw Noob")
  .setColor('RED')
  if (!banTaged) {
    msg.delete()
  return msg.channel.send(kntlembed).then(msg=>msg.delete(30000))
  }
  
  let asuembed = new Discord.MessageEmbed()
  .setTitle("指令: +ban")
  .setDescription("你看到這條信息的話，可能你使用方法出錯了。\n\n**內容功能:** Ban一個成員\n**使用方法:** +ban [用戶] [原因]\n**例子:** +ban @RealKoolisw Noob")
  .setColor('RED')
  if (!reason) {
    msg.delete()
    return msg.channel.send(kntlembed).then(msg=>msg.delete(30000))
  }
  
  let lombed = new Discord.MessageEmbed()
  .setAuthor(`Please create a called ${config.logsChannel} to log a Ban!`)
  .setColor('#FFFF00')
  
  
  let banEmbed = new Discord.MessageEmbed()
  .setColor('RED')
  .setAuthor(`Action Ban`)
  .addField("Target", `<@${banTaged.id}>`)
  .addField("User", `**<@${msg.author.id}>**`)
  .addField("Reason", `\`\`\`${reason}\`\`\``)
  .setTimestamp()
  .setFooter(`• Ban User Information`);//
  let bsuembed = new Discord.MessageEmbed()
  .setDescription(`<:tick:702386031361523723> **Banned ${banTaged.username}#${banTaged.discriminator}** | **${reason}**`)
  .setColor('GREEN')
  
  msg.delete()
  msg.channel.send(bsuembed);
  msg.guild.members.ban(banTaged.id, {days:7, reason: reason})
  
  banTaged.send(`You are banned **${msg.guild.name}** by **${msg.author.username}**, Reason : **${reason}**`)
  logs.send({banEmbed});
  
};