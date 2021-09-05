const settings = require("../../config/settings.json");

module.exports = async (client, guild) => {
	return client.settings.ensure(guild.id, settings);
};
