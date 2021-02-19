const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
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

module.exports.help = {
    name: "kiss",
    description: "This command is used for kiss someone u loVe.",
    usage: "d!kiss <mentions>",
    accessableby: "Member",
    aliases: []
}
