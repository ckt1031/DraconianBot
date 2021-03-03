const Discord = require('discord.js');
const config = require("../../config.json");

module.exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
    let user = args[0];

let embed1 = new Discord.MessageEmbed()
  .setTitle("Error")
  .setDescription("**The user you entered has not been banned!**")
  .setColor('RED')
  let embed2 = new Discord.MessageEmbed()
  .setDescription("you must supply a `UserResolvable`, i.e. a user ID.")
  .setColor('RED')
  
  let EMDDD = new Discord.MessageEmbed()
  .setDescription(`<:tick:702386031361523723> **Unbanned** ${user.id}`)
  .setColor('#FFFF00')
  
    let userID = args[0]
      message.guild.fetchBans().then(bans=> {
      if(bans.size == 0) return message.channel.send(embed1).then(m => m.delete({timeout: 15000}))
      let bUser = bans.find(b => b.user.id == userID)
      if(!bUser) return message.channel.send(embed2).then(m => m.delete({timeout: 15000}))
      message.channel.send(EMDDD)
      message.guild.members.unban(bUser.user)
      })
};

module.exports.help = {
    name: "unban",
    description: "This command is used for unbanning someone",
    usage: "d!unban <USER ID>",
    accessableby: "Ban Members",
    aliases: []
}
