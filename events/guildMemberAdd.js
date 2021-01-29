const settings = require("../settings.js");
exports.run = (client, member) => {
	client.settings.ensure(member.guild.id, settings);
}