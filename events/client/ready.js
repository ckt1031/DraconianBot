module.exports = async client => {
	client.user.setActivity(`RealKoolisw | ${client.guilds.cache.size} Servers`, {
		type: 'LISTENING'
	});
	console.log('Ready!');

	setInterval(() => {
		client.user.setActivity(
			`RealKoolisw | ${client.guilds.cache.size} Servers`,
			{
				type: 'LISTENING'
			}
		);
	}, 30000);
};
