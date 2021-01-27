const Discord = require("discord.js");

exports.run = (client, message, args) => {
  let notice3 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **Failed to set slowmode in this channel, check your slowmode number!**`
    )
    .setColor("RED");
  let notice1 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **Failed to set slowmode in this channel, please enter a valid number!**`
    )
    .setColor("RED");
  let noticwsse1 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **Failed to set slowmode in this channel, you can only type in 0 - 21600 second!**`
    )
    .setColor("RED");
  let notice22 = new Discord.MessageEmbed()
    .setDescription(
      `<:cross1:747728200691482746> **I don't have permission to change channel slowmode!**`
    )
    .setColor("RED");
  if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS"))
    return message.channel
      .send(notice3)
      .then(msg => msg.delete({ timeout: 5000 }));
  let duration = parseInt(args[0]);
  let mmsssqembed = new Discord.MessageEmbed()
    .setDescription(
      `:no_entry_sign: ${message.author.username}, Missing Permission`
    )
    .setColor("#FFFF00");
  if (!message.member.hasPermission("MANAGE_CHANNELS"))
    return message.channel
      .send(mmsssqembed)
      .then(msg => msg.delete({ timeout: 5000 }));
  if (isNaN(duration)) {
    return message.channel.send(notice1);
  } else if (duration < 0 || duration > 21601) {
    return message.channel.send(noticwsse1);
  }
  message.channel.setRateLimitPerUser(duration).catch(() => {
    message.channel.send(notice3);
  });
  let bsuembed = new Discord.MessageEmbed()
    .setDescription(
      `<:tick:702386031361523723> Set channel's slowmode to **${duration}s** `
    )
    .setColor("GREEN");

  message.channel.send(bsuembed);
};

module.exports.help = {
    name: "slowmode",
    description: "This command is used for changing the slowmode as settings page cannot.",
    usage: "d!slowmode <1-21600>",
    accessableby: "Manage Channels",
    aliases: []
}