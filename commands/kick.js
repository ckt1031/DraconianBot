const Discord = require("discord.js");
const config = require("../config.json");

exports.run = async(client, msg, args) => {
  
  let kickTaged = msg.mentions.users.first();
  let reason = args.slice(1).join(' ');
  let logs = msg.guild.channels.cache.find(x => x.name = config.logsChannel);
  let embed6 = new Discord.MessageEmbed()
  .setDescription(`:no_entry_sign: ${msg.author.username}, Missing Permission`)
  .setColor('RED')
  if (!msg.member.hasPermission("KICK_MEMBERS")) return msg.channel.send(embed6).then(msg=>msg.delete(5000));
  
  let mmqembed = new Discord.MessageEmbed()
  .setTitle("Command: +kick")
  .setDescription("Usage: d!kick @user reason")
  .setColor('RED')
  if (!kickTaged) {
    msg.delete()
    return msg.channel.send(mmqembed).then(msg=>msg.delete(30000))
  }
  
  let kntlembed = new Discord.MessageEmbed()
  .setTitle("指令: +kick")
  .setDescription("你看到這條信息的話，可能你使用方法出錯了。\n\n**內容功能:** 踢出一個成員\n**使用方法:** +kick [用戶] [原因]\n**例子:** +kick @RealKoolisw Noob")
  .setColor('RED')
  if (!reason) {
    msg.delete()
    return msg.channel.send(mmqembed).then(msg=>msg.delete(5000))
  }
  
  let asuembed = new Discord.MessageEmbed()
  .setTitle(`Please create a Channel called ${config.logsChannel} to log the bans!`)
  .setColor('#FFFF00')
  
  
  let kickEmbed = new Discord.MessageEmbed()
  .setColor('RED')
  .setTitle(`Action Kick`)
  .addField("Target", `**<@${kickTaged.id}> **`)
  .addField("User", `<@${msg.author.id}>`)
  .addField("Reason", `\`\`\`${reason}\`\`\``)
  .setTimestamp()
 
  
let suembed = new Discord.MessageEmbed()
  .setDescription(`<:tick:702386031361523723> **Kicked ${kickTaged.username}#${kickTaged.discriminator}** | **${reason}**`)
  .setColor('#FFFF00')
  msg.delete()
  msg.channel.send(suembed);
  msg.guild.member(kickTaged).kick(reason);
  
  kickTaged.send(`You had been kicked in **${msg.guild.name}**\ by **${msg.author.username}**, ${reason}`)
  logs.send({kickEmbed});
};