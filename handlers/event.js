const fs = require('fs');
module.exports = (client) => {
	fs.readdir('./events/client/', (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			let event = require(`../events/client/${file}`);
			console.log("loaded Event: " + file)
			let eventName = file.split(".")[0];
			client.on(eventName, event.bind(null, client));
		});
	});
}