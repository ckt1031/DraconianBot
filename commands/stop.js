exports.run = async (client, message, args) => {
     if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    client.distube.stop(message);
    message.channel.send(`${client.emotes.success} | Stopped!`)
}