const settings = require("../../config/settings.json");

module.exports = async (client, guild) => {
	return client.settings.delete(guild.id);
};
