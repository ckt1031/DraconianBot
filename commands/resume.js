exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    let queue = client.distube.resume(message);
    message.channel.send(`${client.emotes.success} | Resumed! Now playing:\n${queue.songs[0].name}`)
}