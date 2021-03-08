module.exports = async (client, message, queue, playlist) => {
   message.channel.send(
			`${client.emotes.success} | Added \`${playlist.name}\` playlist (${
			playlist.songs.length
			} songs) to queue\n${client.status(queue)}`
		)
}