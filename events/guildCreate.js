const settings = require("../settings.js");
exports.run = (client, guild) => {
		client.settings.ensure(guild.id, settings);
	client.user.setActivity(`RealKoolisw | ${client.guilds.cache.size} Servers`, {
		type: 'LISTENING'
	});
}