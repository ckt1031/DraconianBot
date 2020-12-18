const Discord = require("discord.js");
exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  try {
    let embed6 = new Discord.MessageEmbed()
  .setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`)
  .setColor('RED')
    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embed6).then(msg=>msg.delete(5000));
    if (!args[1]) return message.reply('You need to input the channel type!');
    if (!args[0]) return message.reply('You need to input the channel name!');
    
    message.channel.send('I\'ve created the channel!').then(() => {
      message.guild.channels.create(args[1], args[0], []).catch((err) => {
        message.channel.send('There was an error!')
      });
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['crc'],
  guildOnly: true,
  permLevel: 'Administrator'
};

exports.help = {
  name: 'createchannel',
  category: 'Moderation',
  description: 'Creates a channel in the server.',
  usage: 'createchannel <voice, text> <name>'
};