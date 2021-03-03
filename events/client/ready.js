module.exports = async client => {
	console.log('Ready!');
	const activities = [
		`${client.guilds.cache.size} Servers`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Users`,
		`By 酷斯Koolisw`
	];

	let i = 0;
	setInterval(() => client.user.setActivity(`d!help | ${activities[i++ % activities.length]}`, { type: 'WATCHING' }), 15000);
};
