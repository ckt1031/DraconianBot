const Cryptr = require('cryptr');

const decrypt = (text, key) => {
  let cryptr = new Cryptr(key);
  return cryptr.decrypt(text);
};

module.exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.channel.send('You need to input a key to decrypt the text with!');
    if (!args[1]) return message.channel.send('You need to input text to decrypt!');
    
    message.channel.send(decrypt(args.slice(1).join(' '), args[0]));
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

module.exports.help = {
	name: "dae256",
	description: "This command is used for dencrypting your text data with AES256 dencryption",
	usage: "d!dae256 <encrypted-data>",
	accessableby: "Member",
	aliases: []
} 
