const Discord = module.require('discord.js');
const ms = require('ms');

module.exports.run = async (bot, message, args) => {

  let Timer = args[0];
  if(isNaN(Timer)) return message.reply("heh, text time huh? How about **no**?")
  if (ms(Timer) > 2147483647) return message.reply("You dweeb how do you expect me to handle such a big number nerd!")
  if(ms(Timer) < 1) return message.reply("What's the point of that?")

  if(!args[0]){
    return message.channel.send(":x: " + "| Please Enter a time period followed by \"s or m or h\"");
  }

  if(args[0] <= 0){
    return message.channel.send(":x: " + "| Please Enter a time period followed by \"s or m or h\"");
  }

  message.channel.send(":white_check_mark: " + "| Timer Started for: " + `${ms(ms(Timer), {long: true})}`)

  setTimeout(function(){
    message.channel.send(message.author.toString() + ` The Timer Has FINISHED!, it lasted: ${ms(ms(Timer), {long: true})}`)
  }, ms(Timer));
}

module.exports.help = {
    name: "timer",
    description: "This command is used for timing.",
    usage: "d!timer <duration in ms>",
    accessableby: "Member",
    aliases: []
}