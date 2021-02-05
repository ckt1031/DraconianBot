const settings = require('../../settings.json');
const fs = require('fs');

module.exports = async (client, member) => {
	client.settings.ensure(member.guild.id, settings);
	
};
