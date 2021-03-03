const discord = require('discord.js');
const superagent = require('superagent')

module.exports.run = (client, msg, args) => {
  if (msg.channel.nsfw === true) {
    superagent.get('https://nekobot.xyz/api/image')
    .query({ type: 'pgif'})
    .end((err, response, body) => {
      let emb = new discord.MessageEmbed()
                    .setImage(response.body.message)
                    .setColor("#00ff00")
                    .setTitle("Porn Gif here")
                    .setFooter(`©2020 Draconian Workshop | This command requested by ${msg.author.username}#${msg.author.discriminator}`)
                              
                   msg.channel.send(emb)  
    });
  } else {
    msg.channel.send("This isn't NSFW channel!")
  }
};

module.exports.help = {
    name: "porn",
    description: "This command is used for calling NSFW images API to send them, but NSFW channel needed.",
    usage: "d!poke <mention>",
    accessableby: "NSFW/Members",
    aliases: []
}