const Discord = require('discord.js');
const superagent = require('superagent');


module.exports.run = async (client, message, args, tools) => {
    if (message.channel.nsfw == false) return message.channel.send('This is not NSFW channel')
    const { body } = await superagent
    .get("https://nekos.life/api/v2/img/wallpaper");
    
    const embed = new Discord.MessageEmbed()
    .setColor("#ff9900")
    .setTitle("Wallpaper Here")
    .setImage(body.url) 
    message.channel.send({embed})
};

module.exports.help = {
    name: "wallpaper",
    description: "Generating NSFW wallpapers randomly",
    usage: "d!wallpaper",
    accessableby: "NSFW/Member",
    aliases: []
}