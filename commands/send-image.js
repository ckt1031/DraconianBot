const Discord = require("discord.js");

exports.run = async (client, message, args) => {


  let avatar = message.attachments.array()[0].url
  if(!avatar) return message.channel.send("Missing Image")
           let rainbow = new Discord.MessageAttachment(avatar, "image.png")
         return message.channel.send(rainbow);
   
    



        

        

        
}