const Discord = require('discord.js');
const superagent = require('superagent');


exports.run = async (client, message, args) => {
    if (message.channel.nsfw === true) {
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/hentai");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle(`Heres your Hentai Image`)
    .setImage(body.url) 
    .setFooter(`© Draconian Workshop`);
    message.channel.send({embed})
    }else {
    message.channel.send("This isn't NSFW channel!")
  }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ngif',
    description: 'Neko Gifs OwO',
    usage: 'ngif'
  };
