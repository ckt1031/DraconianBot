const fs = require("fs");

module.exports = async client => {
	console.log("Ready!");
	const activities = [
		`${client.guilds.cache.size} Servers`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
		"By 酷斯Koolisw",
	];
	const commandFiles = fs
		.readdirSync("./slash-commands")
		.filter(file => file.endsWith(".js"));
	for (const file of commandFiles) {
		const command = require(`../../slash-commands/${file}`);
		client.api.applications(client.user.id).commands.post({
			data: {
				name: command.name,
				description: command.description,
				options: command.commandOptions,
			},
		});
		client.slcommands.set(command.name, command);
		console.log(`Command POST : ${command.name} from ${file}`);
	}
	console.log("");
	const cmdArrGlobal = await client.api
		.applications(client.user.id)
		.commands.get();
	cmdArrGlobal.forEach(element => {
		console.log(`Global command loaded : ${element.name} (${element.id})`);
	});

	let i = 0;
	setInterval(
		() =>
			client.user.setActivity(
				`d!help | ${activities[i++ % activities.length]}`,
				{ type: "WATCHING" }
			),
		15000
	);
};
