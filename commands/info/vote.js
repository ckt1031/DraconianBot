const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
  msg.delete();
  msg.channel
    .send("Please upvote here for every 12 hours > https://top.gg/bot/711937599975063584/vote")
    
};

module.exports.help = {
    name: "vote",
    description: "Vote us in https://top.gg/bot/711937599975063584/vote every 12 hours",
    usage: "d!vote",
    accessableby: "Everyone",
    aliases: []
}