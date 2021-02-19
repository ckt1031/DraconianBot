const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
  let reason = args.slice(1).join(" ");
  let user = message.mentions.users.first();
  let warns = JSON.parse(fs.readFileSync("../temp-datastore/warnings.json", "utf8"));

  let notice1 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **${message.author.username}, Missing Permission**`
    )
    .setColor("RED");
  let notice3 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **I don't have permission to warn people!**`
    )
    .setColor("RED");
  if (!message.guild.member(client.user).hasPermission(['MANAGE_ROLES', 'KICK_MEMBERS', 'BAN_MEMBERS']))
    return message.channel.send(notice3).then(m => m.delete({timeout: 15000}));
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(notice1).then(m => m.delete({timeout: 15000}));
  if (message.mentions.users.size < 1)
    return message
      .reply("You must mention someone to warn them.")
      .catch(console.error);
  let notice2 = new Discord.MessageEmbed()
    .setDescription(`<:cross1:747728200691482746> **You cannot warn yourself**`)
    .setColor("RED");
  if (message.mentions.users.first().id === message.author.id)
    return message.channel.send(notice2).then(m => m.delete({timeout: 15000}));
  //if (!logchannel) return message.channel.send('I cannot find a logs channel');
    
  if (reason.length < 1) reason = "No reason supplied.";

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
  let botRolePossition = message.guild.member(client.user).roles.highest.position;
  let rolePosition = message.guild.member(user).roles.highest.position;
  let userRolePossition = message.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return message.channel.send(dsfdsfsdf)
  if (botRolePossition <= rolePosition) return message.channel.send(sdfsdfsdfsd)

  if (!warns[`${user.id}, ${message.guild.id}`])
    warns[`${user.id}, ${message.guild.id}`] = {
      warns: 0
    };

  warns[`${user.id}, ${message.guild.id}`].warns++;

  fs.writeFile("../temp-datastore/warnings.json", JSON.stringify(warns), err => {
    if (err) throw err;
  });

  const embed = new Discord.MessageEmbed()
    .setColor(0xffff00)
    .setTimestamp()
    .addField("Action:", "Warning")
    .addField("User:", `${user.username}#${user.discriminator}`)
    .addField(
      "Warned by:",
      `${message.author.username}#${message.author.discriminator}`
    )
    .addField(
      "Number of warnings:",
      warns[`${user.id}, ${message.guild.id}`].warns
    )
    .addField("Reason", reason);
  
  let test1 = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> **Muted <@${user.id}> For 1 Hour** | **Reached Two Warnings**`
    )
    .setColor("GREEN");
  let bsuembed = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> **Warned ${user.username}#${user.discriminator}** | **${reason}**`
    )
    .setColor("GREEN");
  message.delete();
  message.channel.send(bsuembed);
  if (user.bot) return;
  message.mentions.users
    .first()
    .send(
      `You are warned in **${message.guild.name}**, **${reason}**`
    )
    .catch(e => {
      if (e) return;
    });

  let test2 = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> **Kicked ${user.username}#${user.discriminator}** | **Reached Warnings 3**`
    )
    .setColor("GREEN");
  let test3 = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> **Banned ${user.username}#${user.discriminator}** | **Reached 5 Warnings**`
    )
    .setColor("GREEN");

  if (warns[`${user.id}, ${message.guild.id}`].warns == 2) {
    let muteRole = client.guilds.cache
      .get(message.guild.id)
      .roles.cache.find(val => val.name === "Muted");

    let mutetime = "60s";
    message.guild.members.get(user.id).addRole(muteRole.id);
    message.channel.send(test1);

    setTimeout(function() {
      message.guild.members.get(user.id).removeRole(muteRole.id);
    }, ms(mutetime));
  }

  if (warns[`${user.id}, ${message.guild.id}`].warns == 3) {
    message.guild.member(user).kick(reason);
    message.channel.send(test2);
  }

  if (warns[`${user.id}, ${message.guild.id}`].warns == 5) {
    message.guild.member(user).ban(reason);
    message.channel.send(test3);
  }
};

module.exports.help = {
    name: "warn",
    description: "Warn someone u hates/againsting rules, 2 warn for muting, 3 warns for kicking, 5 warns for banning",
    usage: "d!warn <mention> <reason>",
    accessableby: "Member",
    aliases: []
}