module.exports.run = async (client, message, args) => {
	const queue = client.distube.getQueue(message);
	if (Number(args[0]) >= 0 && Number(args[0]) <= queue.songs.length) {
		message.channel.send(`Jumped ${parseInt(args[0])} songs!`);
		return client.distube
			.jump(message, parseInt(args[0]))
			.catch(err => message.channel.send("Invalid song number."));
	}
};

module.exports.help = {
	name: "jumpto",
	description: "This command is used for jumping to song into specify queue.",
	usage: "d!jumpto <queue number>",
	accessableby: "Members",
	aliases: []
};
