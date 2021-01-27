const Cryptr = require('cryptr');

const encrypt = (text, key) => {
  let cryptr = new Cryptr(key);
  return cryptr.encrypt(text);
};

module.exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.channel.send('You need to give a key to encrypt the text with!');
    if (!args[1]) return message.channel.send('You need to give the text to encrypt!');

    message.channel.send(encrypt(args.slice(1).join(' '), args[0]));
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

module.exports.help = {
    name: "aes256",
    description: "This command is used for encrypting your text data with AES256 encryption",
    usage: "d!aes256",
    accessableby: "Member",
		    aliases: []
}


