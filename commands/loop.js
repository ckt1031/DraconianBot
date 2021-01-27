module.exports.run = async (client, message, args) => {
     if (!message.member.voice.channel) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    if (!client.distube.isPlaying(message)) return message.channel.send(`${client.emotes.error} | You must be in a voice channel!`)
    let mode = null;
    switch (args[0]) {
      case "off":
        mode = 0
        break
      case "song":
        mode = 1
        break
      case "queue":
        mode = 2
        break
    }
    mode = client.distube.setRepeatMode(message, mode);
    mode = mode ? mode == 2 ? "Repeat queue" : "Repeat song" : "Off";
    message.channel.send(`${client.emotes.repeat} | Set repeat mode to \`${mode}\``);
}

module.exports.help = {
    name: "loop",
    description: "This command is used for lopping the songs in music system.",
    usage: "d!loop <off/song/queue>",
    accessableby: "Connecting to Voice channel",
    aliases: []
}