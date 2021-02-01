const settings = require('../../settings.js');
const fs = require('fs');

module.exports = async (client, member) => {
	client.settings.ensure(member.guild.id, settings);
	
};
