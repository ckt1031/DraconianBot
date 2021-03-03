const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
  const notice3 = new Discord.MessageEmbed()
    .setDescription(
      "<:cross1:747728200691482746> **I don't have permission to kick people!**"
    )
    .setColor("RED");
  if (!msg.guild.member(client.user).hasPermission("KICK_MEMBERS"))
    return msg.channel.send(notice3).then((m) => m.delete({ timeout: 5000 }));
  const kickTaged = msg.mentions.users.first();
  let reason = args.slice(1).join(" ");
  const embed6 = new Discord.MessageEmbed()
    .setDescription(
      `:no_entry_sign: ${msg.author.username}, Missing Permission`
    )
    .setColor("RED");
  if (!msg.member.hasPermission("KICK_MEMBERS"))
    return msg.channel.send(embed6).then((m) => m.delete({ timeout: 5000 }));
  const mmqembed = new Discord.MessageEmbed()
    .setTitle("Command: d!kick")
    .setDescription("Usage: d!kick @user reason")
    .setColor("RED");
  if (!kickTaged) {
    msg.delete();
    return msg.channel.send(mmqembed).then((m) => m.delete({ timeout: 5000 }));
  }

  const dsfdsfsdf = new Discord.MessageEmbed()
    .setDescription(
      "<:cross1:747728200691482746> Access Denied, **that member has roles higher or equal to you!**"
    )
    .setColor("RED");
  const sdfsdfsdfsd = new Discord.MessageEmbed()
    .setDescription(
      "<:cross1:747728200691482746> Access Denied, **that member has roles higher or equal to me!**"
    )
    .setColor("RED");
  const botRolePossition = msg.guild.member(client.user).roles.highest.position;
  const rolePosition = msg.guild.member(kickTaged).roles.highest.position;
  const userRolePossition = msg.member.roles.highest.position;
  if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf);
  if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd);

  const notice2 = new Discord.MessageEmbed()
    .setDescription(
      "<:cross1:747728200691482746> **You cannot kick yourself!**"
    )
    .setColor("RED");
  if (msg.mentions.users.first().id === msg.author.id)
    return msg.channel.send(notice2);

  const sdfdfsdfsdfdfs = new Discord.MessageEmbed()
    .setDescription(
      "<:cross1:747728200691482746> **An error occurred with banned that member!**"
    )
    .setColor("RED");

  if (!msg.guild.member(kickTaged).kickable) {
    return msg.channel.send(sdfdfsdfsdfdfs);
  }

  if (reason.length < 1) reason = "No reason given.";

  const kickEmbed = new Discord.MessageEmbed()
    .setColor("RED")
    .setTitle("Action Kick")
    .addField("Target", `**<@${kickTaged.id}> **`)
    .addField("User", `<@${msg.author.id}>`)
    .addField("Reason", `\`\`\`${reason}\`\`\``)
    .setTimestamp();

  const suembed = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> **Kicked ${kickTaged.username}#${kickTaged.discriminator}** | **${reason}**`
    )
    .setColor("GREEN");
  msg.delete();
  msg.channel.send(suembed);
  msg.guild.member(kickTaged).kick(reason);

  kickTaged.send(`You had been kicked in **${msg.guild.name}**, ${reason}`);
};

module.exports.help = {
  name: "kick",
  description:
    "This command is used for kicking people u hates or againsting your server rules.",
  usage: "d!kick <mentions> <reason>",
  accessableby: "Kick Members",
  aliases: [],
};
