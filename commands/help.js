const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  const embed = new Discord.MessageEmbed()
    .setTitle("DraconianBot Help")
    .setColor("GREEN")
    .setDescription(
      "**prefix** `d!`\nMore Info please visit: [Here](https://top.gg/bot/711937599975063584) and invite me to your server."
    )
    .addField("**📱Basic**", "`help`, `ping`, `vote`, `uptime`")
    .addField(
      "**⚙utility**",
      "`aes256`, `avatar`, `channel`, `embed`, `roleinfo`, `reverse`, `setafk`, `snipe`, `stats`, `timer`, `translate`, `whois`, `weather`, `youtube`"
    )
    .addField(
      "**🎃Fun**",
      "`8ball`, `cat`, `deaes256`, `kiss`, `meme`, `ngif`, `pat`, `poke`, `smug`, `spank`, `thigh`, `tickle`"
    )
    .addField("**:tada:Giveaways**", "`start-giveaway`, `reroll`, `end-giveaway`")
    .addField("**:frame_photo:Image**", "`circle`, `delete`, `gay`, `changemymind`, `trigger`, `clyde`")
    .addField("**:musical_note:Music**", "`play`, `stop`, `skip`, `queue`, `autoplay`, `loop`, `volume`, `pause`, `resume`")
    .addField(
      "**🛠️Moderation**",
      "`addrole`, `ban`, `clear`, `clearwarn`, `createchannel`, `createemoji`, `kick`, `lockchannel`, `mute`, `rename`, `slowmode`, `unban`, `unlockdown`, `unmute`, `warn`, `warnings`"
    )
    .addField("**:underage:NSFW**", "`4knsfw`, `anal`, `ass`, `hentai`, `holo`, `pussy`, `porn`, `spank`, `urban`")
    .addField("**:gear:Custom Function**", "`setprefix`")
    .setFooter(
      `©2021 Draconian Workshop | This command requested by ${message.author.username}#${message.author.discriminator}`
    )
  message.channel.send({ embed });
};