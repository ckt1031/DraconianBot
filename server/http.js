const express = require('express');
const server = express();
server.all('/', (req, res)=>{
    res.send('Draconian is alive!');
})
server.get('/stats.json', (req, res) => {
	var uptime = process.uptime();
	const date = new Date(uptime * 1000);
	const days = date.getUTCDate() - 1,
		hours = date.getUTCHours(),
		minutes = date.getUTCMinutes(),
		seconds = date.getUTCSeconds(),
		milliseconds = date.getUTCMilliseconds();
	let segments = [];

	segments.push(days + ' day' + (days == 1 ? '' : 's'));
  segments.push(hours + ' hour' + (hours == 1 ? '' : 's'));
	segments.push(minutes + ' minute' + (minutes == 1 ? '' : 's'));
	segments.push(seconds + ' second' + (seconds == 1 ? '' : 's'));
	const dateString = segments.join(', ');
	res.json({ uptime: `${dateString}` })
});

function keepAlive(){
    server.listen(8080, ()=>{console.log("Server is Ready!")});
}

module.exports = keepAlive;