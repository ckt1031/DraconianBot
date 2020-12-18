const Discord = require("discord.js");
const request = require("request");

exports.run = (client, message, _args) => {
    try {
    //This is a command purely for memes
    request("https://some-random-api.ml/meme", function (error, _response, body) {
        if(error) return message.channel.send('Sorry, it appears an error has occurred fetching your meme!').then(() => console.error(error.message))

        const json = JSON.parse(body);
        const { id, image, caption, category } = json;

        const emb = new Discord.MessageEmbed();
            emb.setDescription(`${caption} - ${category} #${id}`);
            emb.setColor('GREEN');
            emb.setImage(image);

        message.channel.send(emb);
    });
    } catch (e) {
        console.error(e.message);
    }
}

exports.help = {
    enabled: true,
    hideHelp: false,
    type: "image",
    name: "meme",
    description: "The `meme` command displays a random meme from the interwebs.",
    usage: "`yabe meme`",
}
