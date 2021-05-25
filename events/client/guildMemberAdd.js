const fs = require("fs");
const settings = require("../../settings.json");

module.exports = async (client, member) => {
	client.settings.ensure(member.guild.id, settings);
};
