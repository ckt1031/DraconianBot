const fs = require('fs');
module.exports = (client) => {
	fs.readdir('./events/giveaways/', (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			let event = require(`../events/giveaways/${file}`);
			console.log("loaded Event: " + file)
			let eventName = file.split(".")[0];
			client.giveawaysManager.on(eventName, event.bind(null, client));
		});
	});
}