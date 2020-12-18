const Discord = require('discord.js');
const superagent = require('superagent');


exports.run = async (client, message, args, tools) => {
    if (message.channel.nsfw == false) return message.channel.send('This is not NSFW channel')
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/wallpaper");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Wallpaper Here")
    .setImage(body.url) 
    message.channel.send({embed})
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'wallpaper',
    description: 'Anime wallpapers OwO',
    usage: 'wallpaper'
  };