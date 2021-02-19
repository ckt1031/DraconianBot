const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

module.exports.run = (client, message, args) => {
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
    let noticEEEe2 = new Discord.MessageEmbed()
    .setDescription(`<:cross1:747728200691482746> **You must mention someone to clear their warns**`)
    .setColor("RED");
    let noticEEREe2 = new Discord.MessageEmbed()
    .setDescription(`<:cross1:747728200691482746> **Couldn't find that user**`)
    .setColor("RED");
  if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES"))
    return message.channel.send(notice3).then(m => m.delete({timeout: 15000}));
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(notice1).then(m => m.delete({timeout: 15000}));
    
    let warns = JSON.parse(fs.readFileSync("./temp-datastore/warnings.json", "utf8"));
    let user = message.mentions.users.first();
    if(message.mentions.users.size < 1) return message.channel.send(noticEEEe2)
    if(!user) return message.channel.send(noticEEREe2);
    if(!warns[`${user.id}, ${message.guild.id}`]){
    warns[`${user.id}, ${message.guild.id}`] = {
        warns: 0
    };
}
    let reason = `${warns[`${user.id}, ${message.guild.id}`].warns} warnings have been cleared for this person`;
    if(warns[`${user.id}, ${message.guild.id}`].warns > 0) {
        warns[`${user.id}, ${message.guild.id}`] = {
        warns: 0
    };
    }else{
        reason = 'This user doesn\'t have any warnings:wink:'
    };

    fs.writeFile("./temp-datastore/warnings.json", JSON.stringify(warns), err => {
        if(err) throw err;
      });

    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTimestamp()
    .addField('Action:', 'Clear Warns', true)
    .addField('User:', `${user.username}#${user.discriminator}`, true)
    .addField('Result:',reason, true)
    message.channel.send({embed});
}


module.exports.help = {
    name: "clearwarn",
    description: "Clear the warnings",
    usage: "d!clearwarn <mention>",
    accessableby: "Manage Roles",
    aliases: []
}    