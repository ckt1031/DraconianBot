const Discord = require("discord.js");
const fs = require("fs");
const settings = require("../settings.js")

module.exports.run = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_SERVER")) return message.channel.send("Missing Permission!");
  
    client.settings.ensure(message.guild.id, settings);
    // Then we'll exit if the user is not admin
    
    
    // Let's get our key and value from the arguments. 
    // This is array destructuring, by the way. 
    const [prefix, ...value] = args;
    // Example: 
    // prop: "prefix"
    // value: ["+"]
    // (yes it's an array, we join it further down!)
    
    // We can check that the key exists to avoid having multiple useless, 
    // unused keys in the config:
//   if(!client.settings.has(message.guild.id, "prefix")) {
  //    return message.reply("This key is not in the configuration.");
  //  }
    
    // Now we can finally change the value. Here we only have strings for values 
    // so we won't bother trying to make sure it's the right type and such. 
    client.settings.set(message.guild.id, args[0], "prefix");
    
    // We can confirm everything's done to the client.
    message.channel.send(`Guild configuration item ${prefix} has been changed to: ${args[0]}`);
}

module.exports.help = {
  name: "prefix"
}
