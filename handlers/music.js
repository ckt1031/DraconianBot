const fs = require("fs");

module.exports = client => {
	fs.readdir("./events/music/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const event = require(`../events/music/${file}`);
			console.log(`loaded Event: ${file}`);
			const eventName = file.split(".")[0];
			client.distube.on(eventName, event.bind(null, client));
		});
	});
};
