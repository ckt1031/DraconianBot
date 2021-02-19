const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
    let target = message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author
let avatar = target.displayAvatarURL({dynamic: false, format: "png"});

        let image = await canvacord.Canvas.rip(avatar);

        let triggered = new Discord.MessageAttachment(image, "rip.png")

        message.channel.send(triggered);
}

module.exports.help = {
    name: "rip",
    description: "This command is used for generating people IN RiP.",
    usage: "d!rip <mentions>",
    accessableby: "Member",
    aliases: []
}