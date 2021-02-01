const Discord = require('discord.js');
let days = 0;
let week = 0;

module.exports.run = (client, message, args) =>{
	let nowtime = new Date().toLocaleString("en", { timeZone: "Asia/Hong_Kong" });
    var milliseconds = parseInt((client.uptime % 1000) / 100),
  seconds = parseInt((client.uptime / 1000) % 60),
  minutes = parseInt((client.uptime / (1000 * 60)) % 60),
  hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
  var days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
  days = (days < 10) ? "0" + days : days;
  hours = (hours < 10) ? "0" + hours : hours;
  minutes = (minutes < 10) ? "0" + minutes : minutes;

    let derweSA = client.mapss.get('uptimedate');

    let serverembed = new Discord.MessageEmbed()
        .setColor("#228B22")
        .addField('Uptime', days + "d " + hours + "h " + minutes + "m " + seconds + "." + milliseconds + "s")
				.addField("Now Time", nowtime)
				.addField('Bootup Time', derweSA);;

    message.channel.send(serverembed);

}

module.exports.help = {
    name: "uptime",
    description: "This command is used for reporting bot's uptime",
    usage: "d!uptime",
    accessableby: "Member",
    aliases: []
}