const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {


  let embed6 = new Discord.MessageEmbed()
  .setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`)
  .setColor('RED')
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed6).then(m => m.delete({timeout: 5000}))
  if(!args[0]) return message.channel.send(`<:no:565766936189861889> Use: **\`?clear <1 - 100>\`**`).then(m => m.delete({timeout: 7000}))
  message.channel.bulkDelete(args[0]).then(() => {
  let embed = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setTitle("Clear Action")
  .addField("User", `<@${message.author.id}> `)
  .addField("Cleared", `**${args[0]}**`)
  .addField("Channel", `${message.channel} | **${message.channel.name}**`)
  
  let kntlembed = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setDescription(`Cleared **${args[0]}** Message here`).then(m => m.delete({timeout: 4000}))
  
  
  message.channel.send(kntlembed)
});

}

module.exports.help = {
  name: "clear"
}