const Discord = require("discord.js");
const moment = require("moment")

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
		const roles = member.roles.cache.map(r => `${r}`).join(', ')
		let serveddrembed = new Discord.MessageEmbed()
	.setDescription("<a:loading:806686528549814344> Fetching Uptime...")
	.setColor("RED")

	message.channel.send(serveddrembed).then( async (message) => {
    const embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setAuthor(`${user.tag} Info`, message.author.displayAvatarURL)
        .setDescription(`**• Name: **${user.tag}\n**• ID: **${user.id}\n**• Account Type: **${trufal[user.bot]}\n**• Status: **${user.presence.status.toUpperCase()}\n**• Game: **${user.presence.game ? user.presence.game.name : 'I do not see him playing anything!'}\n**• Created at: ** ${moment(user.joinedAt).format('DD-MM-YYYY')}\n**• Joined At: **${moment(user.createdAt).format('DD-MM-YYYY')}\n**• Avatar**: [Click here](${user.avatarURL()})\n**• Roles: **${roles}`)

        .setThumbnail(`${user.avatarURL()}`)
        .setTimestamp()
    
    await message.edit(embed)
	})
     
}


module.exports.help = {
    name: "whois",
    description: "Check who is him/her",
    usage: "d!whois <mention or keep blank>",
    accessableby: "Members",
    aliases: []
}