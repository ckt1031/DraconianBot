const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {

  let logs = message.guild.channels.cache.find(x => x.name = config.logsChannel);
  let embed6 = new Discord.MessageEmbed()
  .setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`)
  .setColor('RED')
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embed6).then(msg=>msg.delete(5000));
  if(!args[0]) return message.channel.send(`<:no:565766936189861889> Use: **\`?clear <1 - 100>\`**`).then(msg=>msg.delete(5000));
  if (!logs) return message.channel.send('');
  message.channel.bulkDelete(args[0]).then(() => {
  let embed = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setTitle("Clear Action")
  .addField("User", `<@${message.author.id}> `)
  .addField("Cleared", `**${args[0]}**`)
  .addField("Channel", `${message.channel} | **${message.channel.name}**`)
  
  let kntlembed = new Discord.MessageEmbed()
  .setColor('GREEN')
  .setDescription(`Cleared ${args[0]} Message here`)
  
  
  message.channel.send(kntlembed).then(msg=>msg.delete(5000))
});

}

module.exports.help = {
  name: "clear"
}