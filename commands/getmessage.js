exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  try {
    let fetched = await message.channel.fetchMessage(args[0]);
    let afiles = [];
    
    fetched.attachments.forEach((attachment) => {
      afiles.push({
        name: attachment.filename,
        attachment: attachment.url
      });
    });
    
    let embed = new client.Embed('normal', {
      title: fetched.id,
      url: fetched.url,
      thumbnail: fetched.author.avatarURL,
      footer: 'Message created by ' + fetched.author.tag,
      description: fetched.content || 'No Message',
      files: afiles
    });
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['fm', 'fetchmsg', 'fmsg'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'fetchmessage',
  category: 'General',
  description: 'Finds a message in your channel by ID',
  usage: 'fetchmessage <id>'
};
