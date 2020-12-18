const Discord = require('discord.js');
const { YTSearcher } = require('ytsearcher');
const config = require('../config.json')

const searcher = new YTSearcher(config.youtube_api);

exports.run = async (client, message, args) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.reply('You need to give something to search!');
    
    let msg = await message.channel.send('Searching YouTube...');
    
    searcher.search(args.join(' ')).then(info => {
      if (!info.first) return message.reply('I couldn\'t find anything on Youtube with your query!');
      
      let embed = new Discord.MessageEmbed()
      .setTitle(info.first.title)
      .setDescription(info.first.url)
      .setColor('#eeeeee');
      
      msg.edit(embed);
    });

  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['yt', 'ytsearch'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'youtube',
  category: 'General',
  description: 'Returns info about a Youtube video',
  usage: 'youtube <video name>'
};