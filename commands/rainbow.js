const Discord = require("discord.js");
const canvacord = require("canvacord");

exports.run = async (client, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
let avatar = target.displayAvatarURL({dynamic: false, format: "png"});

        let image = await canvacord.Canvas.rainbow(avatar);

        let rainbow = new Discord.MessageAttachment(image, "rainbow.png")

        message.channel.send(rainbow);
}