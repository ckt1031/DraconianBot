module.exports = async (client, message, queue, playlist, song) => {
	message.channel.send(
			`${client.emotes.play} | Play \`${playlist.name}\` playlist (${
			playlist.songs.length
			} songs).\nNow playing \`${song.name}\` - \`${
			song.formattedDuration
			}\`\n${client.status(queue)}`
		)
	
}