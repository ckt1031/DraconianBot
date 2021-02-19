
const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
  let notice3 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **I don't have permission to ban people!**`
    )
    .setColor("RED");
  if (!msg.guild.member(client.user).hasPermission("BAN_MEMBERS"))
    return msg.channel.send(notice3).then(msg => msg.delete({ timeout: 5000 }));

  let banTaged = msg.mentions.users.first();
  let reason = args.slice(1).join(" ");

  let mmqembed = new Discord.MessageEmbed()
    .setDescription(
      `:no_entry_sign: ${msg.author.username}, Missing Permission`
    )
    .setColor("#FFFF00");
  if (!msg.member.hasPermission("BAN_MEMBERS"))
    return msg.channel.send(mmqembed).then(msg => msg.delete({ timeout: 5000 }));
  let kntlembed = new Discord.MessageEmbed()
    .setTitle("Command: d!ban")
    .setDescription(
      "Wrong Usage!。\n\n**Function:** Ban a member\n**Usage:** d!ban [User] [Reason]\n**Example:** d!ban @RealKoolisw Noob"
    )
    .setColor("RED");
  if (!banTaged) {
    msg.delete();
    return msg.channel.send(kntlembed).then(msg => msg.delete({ timeout: 10000 }));
  }
  let notice2 = new Discord.MessageEmbed()
    .setDescription(`<:cross1:747728200691482746> **You cannot ban yourself!**`)
    .setColor("RED");
  if (msg.mentions.users.first().id === msg.author.id) return msg.channel.send(notice2).then(msg => msg.delete({ timeout: 10000 }));
  let dsfdsfsdf = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> Access Denied, **that member has roles higher or equal to you!**`
    )
    .setColor("RED");
  let sdfsdfsdfsd = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> Access Denied, **that member has roles higher or equal to me!**`
    )
    .setColor("RED");
  let botRolePossition = msg.guild.member(client.user).roles.highest.position;
  let rolePosition = msg.guild.member(banTaged).roles.highest.position;
  let userRolePossition = msg.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf)
  if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd)


  let sdfdfsdfsdfdfs = new Discord.MessageEmbed()
    .setDescription(`<:cross1:747728200691482746> **An error occurred with banned that member!**`)
    .setColor("RED");

  if (reason.length < 1) reason = "No reason given.";

  if (!msg.guild.member(banTaged).bannable) {
    return msg.channel.send(sdfdfsdfsdfdfs);
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
  msg.guild.members.ban(banTaged.id, { reason: reason });

  banTaged.send(
    `You are banned in **${msg.guild.name}**, Reason : **${reason}**`
  );
};

module.exports.help = {
    name: "ban",
    description: "This command is used for banning the members you dont like.",
    usage: "d!ban <mentions> <reason>(optional)",
    accessableby: "Ban Members",
    aliases: []
}