module.exports = async (client, message, err) => {
	message.channel.send(
		`${client.emotes.error} | An error encountered: ${err}`
	)
}