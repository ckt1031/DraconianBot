const settings = require("../../settings.json");
module.exports = async (client, guild) => {
		client.settings.ensure(guild.id, settings);
	client.user.setActivity(`RealKoolisw | ${client.guilds.cache.size} Servers`, {
		type: 'LISTENING'
	});
}