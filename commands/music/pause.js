

module.exports.run = async (client, message, args) => {
    if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | There is nothing playing!`)
    let queue = client.distube.pause(message);
    message.channel.send(`${client.emotes.success} | Paused!`)
}
module.exports.help = {
    name: "pause",
    description: "This command is used for pausing music when inside music channel.",
    usage: "d!pause",
    accessableby: "Members",
    aliases: []
}