const Discord = require('discord.js')
const config = require("../config.json");

exports.run = async (client, message, args) => {
  
   
  let embed6 = new Discord.MessageEmbed()
  .setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`)
  .setColor('RED')
  let notice3 = new Discord.MessageEmbed()
   .setDescription(`<:cross1:747728200691482746> **I don't have permission to unmute people!**`)
   .setColor('RED')
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed6).then(msg=>msg.delete(5000));
    if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) return message.channel.send(notice3).then(msg=>msg.delete(5000));
    let notice2 = new Discord.MessageEmbed()
   .setDescription(`<:cross1:747728200691482746> **You cannot do this for you!**`)
   .setColor('RED')
    if (message.mentions.users.first().id === message.author.id) return message.channel.send(notice2);
let embed7 = new Discord.MessageEmbed()
  .setTitle("Wrong Usage!")
  .setDescription("Correct Example: d!unmute @RealKoolisw")
  .setColor('RED')
    let member = message.mentions.users.first();
    if (!member) {
      message.delete()
      return message.channel.send(embed7).then(msg=>msg.delete(5000))
    }
    let embed8 = new Discord.MessageEmbed()
  .setDescription(`:x: **<@${member.id}>**未被靜音`)
  .setColor('RED')
    let muterole = client.guilds.cache.get(message.guild.id).roles.cache.find(val => val.name === 'Muted');
  let embed = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setTitle(`Action Unmute`)
  .addField(`User`, `<@${member.id}>`)
  .addField(`Executor`, `**$<@${message.author.id}>**`)
    .setTimestamp()
  .setFooter(`• Unmute User Information`);
  let embed5 = new Discord.MessageEmbed()
  .setDescription(`<:tick:702386031361523723> Unmuted <@${member.id}>`)
  .setColor('RED')
  
  
  message.delete()
  
    await (message.guild.member(member).roles.remove(muterole.id));
    message.channel.send(embed5);
};

exports.conf = {
    aliases: []
}

exports.help = {
    name: "unmute",
    description: "Unmute someone",
    usage: "unmute @mention"
}
