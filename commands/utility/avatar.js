const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
	// , dynamic: true, size: 2048 
  const avatar = message.mentions.users.size
    ? message.mentions.users
      .first()
      .avatarURL({ format: "png"})
    : message.author.avatarURL({ format: "png"});
  if (message.mentions.users.size > 0) {
    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle(`Avatar for ${message.mentions.users.first().username}:`)
      .setImage(`${avatar}`);

    message.channel.send({ embed });
  } else {
    const embed = new Discord.MessageEmbed()
      .setColor('GREEN')
      .setTitle(`Avatar for ${message.author.username}:`)
      .setImage(`${`${avatar}?size=2048`}`);

    message.channel.send({ embed });
  }
};

module.exports.help = {
  name: "avatar",
  description: "This command is used for showing your/other member's avatar.",
  usage: "d!avatar <mentions>(optional)",
  accessableby: "Member",
  aliases: ['av'],
};
