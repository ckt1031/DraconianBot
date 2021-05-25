const fs = require("fs");

module.exports = client => {
	fs.readdir("./events/client/", (err, files) => {
		if (err) console.log(err);
		files.forEach(file => {
			const event = require(`../events/client/${file}`);
			console.log(`loaded Event: ${file}`);
			const eventName = file.split(".")[0];
			client.on(eventName, event.bind(null, client));
		});
	});
};
