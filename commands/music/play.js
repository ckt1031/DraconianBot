module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
	let string = args.join(" ")
	if (!string) return message.channel.send(`${client.emotes.error} | Please enter a song url or query to search.`)
	try {
		client.distube.play(message, string)
	} catch (e) {
		message.channel.send(`${client.emotes.error} | Error: \`${e}\``)
	}
}

module.exports.help = {
	name: "play",
	description: "This command is used for playing some music you like.",
	usage: "d!play <song>",
	accessableby: "Members",
	aliases: ['p']
}