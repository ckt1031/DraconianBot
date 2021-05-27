const settings = require("../../config/settings.json");

module.exports = async (client, guild) => {
	client.settings.delete(guild.id);
};
