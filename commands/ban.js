const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config.json");

exports.run = async (client, msg, args) => {
  let notice3 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **I don't have permission to ban people!**`
    )
    .setColor("RED");
  if (!msg.guild.member(client.user).hasPermission("BAN_MEMBERS"))
    return msg.channel.send(notice3).then(msg => msg.delete({timeout: 5000}));

  let banTaged = msg.mentions.users.first();
  let reason = args.slice(1).join(" ");
  
  let mmqembed = new Discord.MessageEmbed()
    .setDescription(
      `:no_entry_sign: ${msg.author.username}, Missing Permission`
    )
    .setColor("#FFFF00");
  if (!msg.member.hasPermission("BAN_MEMBERS"))
    return msg.channel.send(mmqembed).then(msg => msg.delete({timeout: 5000}));
  let kntlembed = new Discord.MessageEmbed()
    .setTitle("Command: +ban")
    .setDescription(
      "Wrong Usage!。\n\n**Function:** Ban a member\n**Usage:** +ban [User] [Reason]\n**Example:** +ban @RealKoolisw Noob"
    )
    .setColor("RED");
  if (!banTaged) {
    msg.delete();
    return msg.channel.send(kntlembed).then(msg => msg.delete({timeout: 10000}));
  }
  let notice2 = new Discord.MessageEmbed()
    .setDescription(`<:cross1:747728200691482746> **You cannot ban yourself!**`)
    .setColor("RED");
  if (msg.mentions.users.first().id === msg.author.id) return msg.channel.send(notice2).then(msg => msg.delete({timeout: 10000}));
    

  
  if (!reason) {
    msg.delete();
    return msg.channel.send(kntlembed).then(msg => msg.delete({timeout: 30000}));
  }

  

  let banEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setAuthor(`Action Ban`)
    .addField("Target", `<@${banTaged.id}>`)
    .addField("User", `**<@${msg.author.id}>**`)
    .addField("Reason", `\`\`\`${reason}\`\`\``)
    .setTimestamp()
    .setFooter(`• Ban User Information`); //
  let bsuembed = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> **Banned ${banTaged.username}#${banTaged.discriminator}** | **${reason}**`
    )
    .setColor("GREEN");

  msg.delete();
  msg.channel.send(bsuembed);
  msg.guild.members.ban(banTaged.id, { days: 7, reason: reason });

  banTaged.send(
    `You are banned **${msg.guild.name}** by **${msg.author.username}**, Reason : **${reason}**`
  );
};