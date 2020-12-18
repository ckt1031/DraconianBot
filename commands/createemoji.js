const Discord = require("discord.js");
exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  try {
    let embed6 = new Discord.MessageEmbed()
  .setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`)
  .setColor('RED')
    if (!message.member.hasPermission("MANAGE_EMOJIS")) return message.channel.send(embed6).then(msg=>msg.delete(5000));
    let emoji = message.attachments.array()[0] || args[0];
    
    if (emoji) {
      if (emoji.url) {
        if (args[0]) {
          message.guild.createEmoji(emoji.url, args[0])
          .then(emoji => message.channel.send('I\'ve created the ' + emoji.name + ' emoji!'))
          .catch(err => message.reply('I couldn\'t create the emoji!\n' + err));
        } else message.reply('You need to put the name for the emoji in!');
      } else {
        if (args[1]) {
          message.guild.createEmoji(emoji, args[1])
          .then(emoji => message.channel.send('I\'ve created the ' + emoji.name + ' emoji!'))
          .catch(err => message.reply('I couldn\'t create the emoji!\n' + err));
        } else message.reply('You need to put the name for the emoji in!');
      }
      
    } else message.reply('You need to give the image for the emoji!');
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['createemote', 'ce', 'createmoji'],
  guildOnly: true,
  permLevel: 'Moderator'
};

exports.help = {
  name: 'createemoji',
  category: 'General',
  description: 'Creates a server emoji.',
  usage: 'createemoji <url, [attachment]> <name>'
};
