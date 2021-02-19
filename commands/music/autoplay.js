module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
	if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
	let mode = client.distube.toggleAutoplay(message);
	message.channel.send("Set autoplay mode to `" + (mode ? "On" : "Off") + "`");
}

module.exports.help = {
    name: "autoplay",
    description: "This command is used for enabling or disabling autoplay features for music system.",
    usage: "d!autoplay",
    accessableby: "Member",
    aliases: []
}