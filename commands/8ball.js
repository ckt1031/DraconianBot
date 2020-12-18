const Discord = require("discord.js");
function doMagic8BallVoodoo() {
  var rand = [
    "Yes",
    "No",
    "Why are you even trying?",
    "What do you think? NO",
    "Maybe",
    "Never",
    "Yep",
    "idk"
  ];

  return rand[Math.floor(Math.random() * rand.length)];
}

exports.run = async (client, message, args, level) => {
  message.channel.send("My anwser is: " + doMagic8BallVoodoo());
};

exports.help = {
  name: "8ball",
  category: "fun",
  description: "Returns either yours or [member]'s avatar.",
  usage: "avatar [member]"
};
