
const Discord = require('discord.js');
const fs = require("fs");
const ms = require("ms");

exports.run = (client, message, args) => {
  let newname = args.slice(1).join(' ');
  let user;
  let mention = message.mentions.users.first();
  if (!mention){
    user = message.guilds.members.get(args[0])
    if (!user) return message.reply('You must Tag someone or give me a Valid userID for me to rename them.').catch(console.error);
  }else{
    user = message.guild.member(mention)
  }
  
  try {
      user.setNickname(newname)
  } catch(e) {
      let embed = new Discord.MessageEmbed()
            .setDescription("<:cross1:747728200691482746> **Failed to set user's nickname!**")
      message.channel.send(embed3)
  }
    let embed = new Discord.MessageEmbed()
            .setDescription("<:tick:702386031361523723> **Nickname has been set!**")
  message.channel.send(embed);
};

module.exports.help = {
    name: "rename",
    description: "This command is used for renaming someone's nickname.",
    usage: "d!rename <mentions> <nickname>",
    accessableby: "Manage Nicknames",
    aliases: []
}