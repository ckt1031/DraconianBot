const Discord = require('discord.js');
const fetch = require('node-fetch')
// let days = 0;
// let week = 0;
const os = require('os');

module.exports.run = async (client, message, args) => {
	let nowtime = new Date().toLocaleString("en", { timeZone: "Asia/Hong_Kong" });
	var milliseconds = parseInt((client.uptime % 1000) / 100),
		seconds = parseInt((client.uptime / 1000) % 60),
		minutes = parseInt((client.uptime / (1000 * 60)) % 60),
		hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
	var days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
	days = (days < 10) ? "" + days : days;
	hours = (hours < 10) ? "0" + hours : hours;
	minutes = (minutes < 10) ? "0" + minutes : minutes;
	seconds = (seconds < 10) ? "0" + seconds : seconds;

	var ut_sec = os.uptime();
	var ut_min = ut_sec / 60;
	var ut_hour = ut_min / 60;
	var ut_day = ut_hour / 24;

	ut_sec = Math.floor(ut_sec);
	ut_min = Math.floor(ut_min);
	ut_hour = Math.floor(ut_hour);
	ut_day = Math.floor(ut_day);

	ut_day = ut_day % 24;
	ut_hour = ut_hour % 60;
	ut_min = ut_min % 60;
	ut_sec = ut_sec % 60;

	ut_day = (ut_day < 10) ? "" + ut_day : ut_day;
	ut_hour = (ut_hour < 10) ? "0" + ut_hour : ut_hour;
	ut_min = (ut_min < 10) ? "0" + ut_min : ut_min;
	ut_sec = (ut_sec < 10) ? "0" + ut_sec : ut_sec;
	let derweSA = client.mapss.get('uptimedate');
	let serveddrembed = new Discord.MessageEmbed()
	.setDescription("<a:loading:806686528549814344> Fetching Uptime...")
	.setColor("RED")

	message.channel.send(serveddrembed).then( async (message) => {
	await	fetch(`https://api.hetrixtools.com/v1/f10ac71364c8b1aa149b4079fe8eafc9/uptime/report/483cfd9cb2dd306bf8c00917da1df827/`)
      .then(response => response.json())
      .then(data => {
        let numberas = data.Uptime_Stats.Total.Uptime.toLocaleString()
			
			let serverembedss = new Discord.MessageEmbed()
		.setColor("#ffbbbb")
		.addField('Bot Uptime', days + " Day, " + hours + " Hrs, " + minutes + " Min, " + seconds + " Sec")
		.addField('Server/OS Uptime', ut_day + " Day, " + ut_hour + " Hrs, " + ut_min + " Min, " + ut_sec + " Sec")
		.addField("Uptime Percentage", `${numberas}%`)
	//	.addField("Now Time", nowtime)
  //	.addField('Bootup Time', derweSA);;
	  .setFooter(`Last Launched at ${derweSA}`);
	message.edit(serverembedss);
	})
    });
}

module.exports.help = {
	name: "uptime",
	description: "This command is used for reporting bot's uptime",
	usage: "d!uptime",
	accessableby: "Member",
	aliases: []
}