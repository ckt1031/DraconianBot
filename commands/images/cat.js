const request = require('request'); 
const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
        request('http://edgecats.net/random', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                    let emb = new Discord.MessageEmbed()
                    .setImage(body)
                    .setColor("#00ff00")
                    .setTitle("Your random cat here")
                    .setFooter(`©2020 Draconian Workshop | This command requested by ${message.author.username}#${message.author.discriminator}`)
                              
                   message.channel.send(emb)  
            }
        });
    }

module.exports.help = {
    name: "cat",
    description: "This command is used for posting cat's images randomly.",
    usage: "d!cat",
    accessableby: "Members",
    aliases: []
}