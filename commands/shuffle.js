const emotes = require ("../config.json");
const embedColor = "#36393e";
const embedSuccess = "#22BF41";
const embedFail = "#f30707";

module.exports.run = async (client, message) => {

    if(!message.member.voice.channel) return message.channel.send({embed: {color: embedFail, description: `You must be in a voice channel to listen to music` }})

    if(!client.player.isPlaying(message.guild.id)) return message.channel.send({embed: {color: embedFail, description: `Nothing is being played! Use !play [song] to play something` }})

    client.player.shuffle(message.guild.id);
    return message.channel.send({embed: {color: embedSuccess, description: `Queue shuffled!` }})
    
};

module.exports.config = {
    name: "shuffle",
    aliases: []
};