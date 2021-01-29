const settings = require("../settings.js");
exports.run = (client, guild) => {
		client.settings.delete(guild.id);
	client.user.setActivity(`RealKoolisw | ${client.guilds.cache.size} Servers`, {
		type: 'LISTENING'
	});
}