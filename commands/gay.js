const Discord = require("discord.js");
const canvacord = require("canvacord");

exports.run = async (client, message, args) => {
    let target = message.mentions.users.first() || message.author

  let avatar = message.attachments.array()[0]
  
 
  



    
    if (avatar) {
      if (avatar.url) {
          let image = await canvacord.Canvas.rainbow(avatar.url);
           let rainbow = new Discord.MessageAttachment(image, "rainbow.png")
         return message.channel.send(rainbow);
      }
    } else {
        let image = await canvacord.Canvas.rainbow(target.displayAvatarURL({dynamic: false, format: "png"}));
           let rainbow = new Discord.MessageAttachment(image, "rainbow.png")
          return message.channel.send(rainbow);
}
    



        

        

        
}