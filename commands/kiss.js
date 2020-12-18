const Discord = require('discord.js');

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  try {    
    let member = message.mentions.members.first();
    require('request')({url: 'https://nekos.life/api/kiss', json: true}, (req, res, json) => {
      if (member) {
        let embed = new Discord.MessageEmbed()
        .setTitle(message.author.username + ' kisses ' + member.user.username)
        .setColor('#eeeeee')
        
        .setImage(json.url);

        message.channel.send(embed);
      } else message.reply('You need to mention the user to kiss!');
    });
    
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'kiss',
  category: 'Fun',
  description: 'Returns a kiss',
  usage: 'kiss <user>'
};
