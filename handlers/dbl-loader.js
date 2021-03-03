const fs = require('fs');
module.exports = (client) => {
	fs.readdir('./events/dbl/', (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			let event = require(`../events/dbl/${file}`);
			console.log("loaded Event: " + file)
			let eventName = file.split(".")[0];
			client.dbl.on(eventName, event.bind(null, client));
		});
	});
}