const Discord = require('discord.js');

exports.run = (client, message, args) => {
    let nsfwV = message.channel.nsfw ? 'Yes' : 'No';
    let parentV = message.channel.parent ? message.channel.parent : 'No parent category';
    let topicV = message.channel.topic ? message.channel.topic : 'There is no topic for this channel.';
    let embed = new Discord.MessageEmbed()
        .setTitle('Channel: ' + message.channel.name)
        .setDescription('Topic: ' + topicV)
        .addField('NSFW?', nsfwV, true)
        .addField("Category: ", parentV, true)
        .addField('Position: ', message.channel.position, true)
        .setColor(client.config.embedColor);

    message.channel.send(embed);
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "info",
    name: "channel",
    description: "The `channel` command gives information about the current channel.",
    usage: "`yabe channel`"
}
