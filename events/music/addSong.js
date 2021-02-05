module.exports = async (client, message, queue, song) => {
	message.channel.send(
		`${client.emotes.success} | Added ${song.name} - \`${
		song.formattedDuration
		}\` to the queue`
	)
}