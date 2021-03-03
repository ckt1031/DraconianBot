const settings = require("../../settings.json");
module.exports = async (client, guild) => {
	client.settings.ensure(guild.id, settings);
}