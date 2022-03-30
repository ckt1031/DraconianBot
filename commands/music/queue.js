exports.run = async (client, message, args) => {
	const queue = client.distube.getQueue(message);
	if (!queue)
		return message.channel.send(
			`${client.emotes.error} | There is nothing playing!`
		);
	const q = queue.songs
		.map(
			(song, i) =>
				`${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${
					song.formattedDuration
				}\``
		)
		.join("\n");
	message.channel.send(`${client.emotes.queue} | **Server Queue**\n${q}`);
};

module.exports.help = {
	name: "queue",
	description: "This command is used for fetching queue from music system.",
	usage: "d!queue",
	accessableby: "Members",
	aliases: [],
};
