
const emotes = require ("../config.json");
const Discord = require("discord.js")
const { Util, MessageEmbed } = require("discord.js");
const YouTube = require("simple-youtube-api");
require("dotenv").config();
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.YTAPI_KEY);
const settings = require('../app.js')

module.exports.run = async (client, message, args) => {
    const queue = client.queue
    const searchString = args.slice(1).join(" ");
    const url = args[1] ? args[1].replace(/<(.+)>/g, "$1") : "";
    const serverQueue = queue.get(message.guild.id);
    
if (!message.member.voice.channel) return message.channel.send({
            embed: {
                color: "RED",
                description: "I'm sorry, but you need to be in a voice channel to skip a music!"
            }
        });
        if (!serverQueue) return message.channel.send({
            embed: {
                color: "RED",
                description: "There is nothing playing that I could skip for you"
            }
        });
        serverQueue.connection.dispatcher.end("[runCmd] Skip command has been used");
        return message.channel.send({
            embed: {
                color: "GREEN",
                description: "⏭️  **|**  I skipped the song for you"
            }
        });

    
};

module.exports.config = {
    name: "skip",
    aliases: ["s"]
};