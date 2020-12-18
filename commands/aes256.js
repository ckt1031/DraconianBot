const Cryptr = require('cryptr');

const encrypt = (text, key) => {
  let cryptr = new Cryptr(key);
  return cryptr.encrypt(text);
};

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.channel.send('You need to give a key to encrypt the text with!');
    if (!args[1]) return message.channel.send('You need to give the text to encrypt!');
    
    message.channel.send(encrypt(args.slice(1).join(' '), args[0]));
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['encrypt'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'aes256ctr',
  category: 'General',
  description: 'Encrypts text in aes-256-ctr',
  usage: 'aes256ctr <key> <text>'
};
