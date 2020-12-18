const Discord = require("discord.js");
const ms = require("ms");
const config = require("../config.json");

module.exports.run = async (client, message, args) => {

  //!tempmute @user 1s/m/h/d
let embed6 = new Discord.MessageEmbed()
  .setDescription(`:no_entry_sign: ${message.author.username}, Missing Permission`)
  .setColor('RED')
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embed6).then(msg=>msg.delete(5000));
  let tomute = message.mentions.users.first();
  const embed50 = new Discord.MessageEmbed()
        .setTitle(`Command: d!mute`)
        .setDescription(`Usage: d!mute @user length reason`)
        .setColor(0xff0000)
        .setFooter(`Beta Feature`)
  if(!tomute) return message.channel.send(embed50);
  let muterole = client.guilds.cache.get(message.guild.id).roles.cache.find(val => val.name === 'Muted');
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  
      
  }
  
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.channel.send(embed50);
  let reason = args.slice(2).join(' ');
  if(!reason) return message.channel.send(embed50);
  
   let logs = message.guild.channels.cache.find(x => x.name = config.logsChannel);
  
   let embed = new Discord.MessageEmbed()
  .setTitle(`Action Mute`)
  .setColor('RED')
  .addField(`Target`, `<@${tomute.id}>`)
  .addField(`User`, `<@${message.author.id}>`)
   .addField(`TempMute Length`, `${ms(ms(mutetime))}`)
  .addField(`Reason`, `\`\`\`${reason}\`\`\``)
    .setTimestamp()
  .setFooter(`• Mute User Information`);
  
  
let embed10 = new Discord.MessageEmbed()
  .setDescription(`<:tick:702386031361523723> **Muted ${tomute.username}#${tomute.discriminator} for ${ms(ms(mutetime))}** | **${reason}**`)
  .setColor('GREEN')
  await(message.guild.member(tomute).roles.add(muterole));
  message.delete()
  message.channel.send(embed10);
  tomute.send(`You had been muted for **${ms(ms(mutetime))}** in **${message.guild.name}** by **${message.author.username}**, Reason : **${reason}**`)
 

  setTimeout(function(){
    message.guild.member(tomute).roles.remove(muterole.id);
  }, ms(mutetime));
};

//end of module


module.exports.help = {
  name: "tempmute"
}