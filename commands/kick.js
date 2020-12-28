const Discord = require("discord.js");
const config = require("../config.json");

exports.run = async (client, msg, args) => {
  let notice3 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **I don't have permission to kick people!**`
    )
    .setColor("RED");
  if (!msg.guild.member(client.user).hasPermission("KICK_MEMBERS"))
    return msg.channel.send(notice3).then(m => m.delete({timeout: 5000}))
  let kickTaged = msg.mentions.users.first();
  let reason = args.slice(1).join(" ");
  let embed6 = new Discord.MessageEmbed()
    .setDescription(
      `:no_entry_sign: ${msg.author.username}, Missing Permission`
    )
    .setColor("RED");
  if (!msg.member.hasPermission("KICK_MEMBERS"))
    return msg.channel.send(embed6).then(m => m.delete({timeout: 5000}));
    let mmqembed = new Discord.MessageEmbed()
    .setTitle("Command: d!kick")
    .setDescription("Usage: d!kick @user reason")
    .setColor("RED");
  if (!kickTaged) {
    msg.delete();
    return msg.channel.send(mmqembed).then(m => m.delete({timeout: 5000}))
  }
  let notice2 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **You cannot kick yourself!**`
    )
    .setColor("RED");
  if (msg.mentions.users.first().id === msg.author.id)
    return msg.channel.send(notice2);
  

  if (!reason) {
    msg.delete();
    return msg.channel.send(mmqembed).then(m => m.delete({timeout: 5000}))
  }

  

  let kickEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle(`Action Kick`)
    .addField("Target", `**<@${kickTaged.id}> **`)
    .addField("User", `<@${msg.author.id}>`)
    .addField("Reason", `\`\`\`${reason}\`\`\``)
    .setTimestamp();

  let suembed = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> **Kicked ${kickTaged.username}#${kickTaged.discriminator}** | **${reason}**`
    )
    .setColor("#FFFF00");
  msg.delete();
  msg.channel.send(suembed);
  msg.guild.member(kickTaged).kick(reason);

  kickTaged.send(
    `You had been kicked in **${msg.guild.name}**\ by **${msg.author.username}**, ${reason}`
  );

};