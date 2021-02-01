const settings = require("../../settings.js");
module.exports = async (client, guild) => {
		client.settings.delete(guild.id);
	client.user.setActivity(`RealKoolisw | ${client.guilds.cache.size} Servers`, {
		type: 'LISTENING'
	});
}