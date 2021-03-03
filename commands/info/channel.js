const Discord = require('discord.js');

module.exports.run = (client, message, args) => {
    
   let xhxdsa = message.mentions.channels.first();
    
    if (xhxdsa) {
     let nsfwV = xhxdsa.nsfw ? 'Yes' : 'No';
    let parentV = xhxdsa.parent ? xhxdsa.parent : 'No parent category';
    let topicV = xhxdsa.topic ? xhxdsa.topic : 'There is no topic for this channel.';
    let embed = new Discord.MessageEmbed()
        .setTitle('Channel: ' + xhxdsa.name)
        .setDescription('Topic: ' + topicV)
        .addField('NSFW?', nsfwV, true)
        .addField("Category: ", parentV, true)
        .addField('Position: ', xhxdsa.position, true)
        .setColor('GREEN');

    return message.channel.send(embed);
    } else {
        let nsfwV = message.channel.nsfw ? 'Yes' : 'No';
    let parentV = message.channel.parent ? message.channel.parent : 'No parent category';
    let topicV = message.channel.topic ? message.channel.topic : 'There is no topic for this channel.';
    let embed = new Discord.MessageEmbed()
        .setTitle('Channel: ' + message.channel.name)
        .setDescription('Topic: ' + topicV)
        .addField('NSFW?', nsfwV, true)
        .addField("Category: ", parentV, true)
        .addField('Position: ', message.channel.position, true)
        .setColor('GREEN');

          return message.channel.send(embed);;
}
}

module.exports.help = {
    name: "channel",
    description: "Checking channel status.",
    usage: "d!channel <channel-mentions>(optional)",
    accessableby: "Member",
    aliases: []
}