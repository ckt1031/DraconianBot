const fs = require('fs');

module.exports = async (client) => {
	fs.readdir('./commands/', (err, files) => {
		if (err) return console.log(err);
		files.forEach(file => {
			if (!file.endsWith('.js')) return;
			let props = require(`../commands/${file}`);
			console.log('Successfully loaded Command: ' + file);
			let commandName = file.split('.')[0];
			client.commands.set(commandName, props);
		});
	});
}