const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

exports.run = (client, message, args) => {
    let warns = JSON.parse(fs.readFileSync("../temp-datastore/warnings.json", "utf8"));
    let user = message.mentions.users.first();
    if(message.mentions.users.size < 1) return message.reply('You must mention someone to check their warns.').catch(console.error);
    if(!user) return message.reply("Couldn't find that user...");
    if(!warns[user.id]) warns[user.id] = {
      warns: 0
    };

    const embed = new Discord.MessageEmbed()
    .setColor('GREEN')
    .setTimestamp()
    .addField('Action:', 'Warn Check')
    .addField('User:', `${user.username}#${user.discriminator}`)
    .addField('Number of warnings:', warns[`${user.id}, ${message.guild.id}`].warns)
    message.channel.send({embed});
}

module.exports.help = {
    name: "warnings",
    description: "Check the people you mentioned who has warnings or not",
    usage: "d!warnings <mention>",
    accessableby: "Members",
    aliases: []
}