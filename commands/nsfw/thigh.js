const discord = require('discord.js');
const superagent = require('superagent')

exports.run = (client, msg, args) => {
  if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'thigh'})
    .end((err, response, body) => {
      let emb = new discord.MessageEmbed()
                    .setImage(response.body.message)
                    .setColor("#00ff00")
                    .setTitle("Thigh here")
                    .setFooter(`©2020 Draconian Workshop | This command requested by ${msg.author.username}#${msg.author.discriminator}`)
                              
                   msg.channel.send(emb)  
    });
  } else {
    msg.channel.send("This isn't NSFW channel!")
  }
};

module.exports.help = {
    name: "thigh",
    description: "This command is used for generating thigh image.",
    usage: "d!thigh",
    accessableby: "NSFW/Member",
    aliases: []
}