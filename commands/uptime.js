const Discord = require('discord.js');
let days = 0;
let week = 0;

exports.run = (client, message, args) =>{
    var milliseconds = parseInt((client.uptime % 1000) / 100),
  seconds = parseInt((client.uptime / 1000) % 60),
  minutes = parseInt((client.uptime / (1000 * 60)) % 60),
  hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
  var days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
  days = (days < 10) ? "0" + days : days;
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

    

    let serverembed = new Discord.MessageEmbed()
        .setColor("#228B22")
        .addField('Uptime', days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s");

    message.channel.send(serverembed);

}
