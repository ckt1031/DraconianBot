const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
    let target = message.mentions.users.first() || message.author

  let avatar = message.attachments.array()[0]
  
 
  



    
    if (avatar) {
      if (avatar.url) {
          let image = await canvacord.Canvas.delete(avatar.url);
           let rainbow = new Discord.MessageAttachment(image, "delete.png")
         return message.channel.send(rainbow);
      }
    } else {
        let image = await canvacord.Canvas.delete(target.displayAvatarURL({dynamic: false, format: "png"}));
           let rainbow = new Discord.MessageAttachment(image, "delete.png")
          return message.channel.send(rainbow);
}     
}

module.exports.help = {
	name: "delete",
	description: "This command is used for delete someone u hates with windows trash bin",
	usage: "d!delete [<mention> or <attachments>]",
	accessableby: "Member",
	aliases: []
} 