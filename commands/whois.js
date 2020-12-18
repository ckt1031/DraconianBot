const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let trufal = {
            "true": "Robot",
            "false": "Human"
        }

        let status = { 
            "online": "<:online:734741273214320652> Online",
            "idle": "<:idle:734741276779479121> Idle",
            "dnd": "<:dnd:734741275139375104> Do Not Disturb",
            "invisible": "<:invisible:734741275294826606> Offline"
        }

        let user;
    if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }
    const member = message.guild.member(user)
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${user.tag} Info`, message.author.displayAvatarURL)
        .setDescription(`**• Name：**${user.tag}\n**• ID: **${user.id}\n**• Account Type：**${trufal[user.bot]}\n**• Status：**${status[user.presence.status]}\n**• Game： **${user.presence.game ? user.presence.game.name : 'I do not see him playing anything!'}\n**• Created at:** ${user.createdAt}**\n**• Avatar：**[Click here](user.avatarURL)\n**• User Billings：** Draconian Free Package`)

        .setThumbnail(user.avatarURL)
        .setTimestamp()
    
    message.channel.send('<a:Discordloading:715868120795054142>Loading From Discord API')
  .then((message) => {
    setTimeout(function() {
    message.edit({embed});
  }, 2000)});
     
}


module.exports.help = {
  name: "warninfo"
}