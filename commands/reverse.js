exports.run = async (client, message, args) => {
  try {
    if (!args[0]) return message.reply('You need to input the text to reverse!');
    
    const str = args.join(' ');
    let msg = await message.reply(str.split('').reverse().join(''));
    msg.react('🔁');
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'reverse',
  category: 'Fun',
  description: 'Returns the string you input reversed',
  usage: 'reverse <text>'
};
