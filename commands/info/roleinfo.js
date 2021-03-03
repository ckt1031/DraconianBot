const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let inline = true

    let role = args.join(` `)
    if(!role) return message.reply("Specify a role!");
    let gRole = message.guild.roles.cache.get(role)
    if(!gRole) return message.reply("Couldn't find that role.");
    
    const status = {
        false: "No",
        true: "Yes"
      }

    let roleemebed = new Discord.MessageEmbed()
    .setColor("#00ff00")
    .addField("ID", gRole.id, inline )
    .addField("Name", gRole.name, inline)
    .addField("Mention", `<@&${gRole.id}>`, inline)
    .addField("Hex", gRole.hexColor, inline)
    .addField("Members", gRole.members.size, inline)
    .addField("Position", gRole.position, inline)
    .addField("Hoisted", status[gRole.hoist], inline)
    .addField("Mentionable", status[gRole.mentionable], inline)
    .addField("Managed", status[gRole.managed], inline)
    
    message.channel.send(roleemebed);

}

module.exports.help = {
    name: "roleinfo",
    description: "This command is used for generating people IN RiP.",
    usage: "d!roleinfo <roles-ID>",
    accessableby: "Member",
    aliases: []
}