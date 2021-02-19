module.exports.run = async (client, message, args) => {
	let queue = client.distube.getQueue(message);
	if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
		message.channel.send(`Jumped ${parseInt(args[0])} songs!`)
		return client.distube.jump(message, parseInt(args[0]))
			.catch(err => message.channel.send("Invalid song number."));
	}
	else {
		message.channel.send(`Please use a number between **0** and **${client.distube.getQueue(message).length}**   |   *(0: disabled, 1: Repeat a song, 2: Repeat all the queue)*`)
	}
}

module.exports.help = {
	name: "jumpto",
	description: "This command is used for jumping to song into specify queue.",
	usage: "d!jumpto <queue number>",
	accessableby: "Members",
	aliases: []
}
