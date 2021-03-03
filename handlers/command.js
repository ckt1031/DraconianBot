const fs = require('fs');

module.exports = async (client) => {
	const folders = fs.readdirSync("./commands/")
	for (const files of folders) {
		const folder = fs.readdirSync(`./commands/${files}/`).filter(file => file.endsWith(".js"))
		for (const commands of folder) {
			const command = require(`../commands/${files}/${commands}`)
			let commandName = commands.split('.')[0];
			console.log('Command Loaded ' + commands);
			client.commands.set(commandName, command);
			command.help.aliases.forEach(alias => {
      client.aliases.set(alias, commandName);
    });
		}
	}
}