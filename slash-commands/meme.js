const Discord = require("discord.js");
const request = require("request");

module.exports = {
  name: "meme",
  description: "Generate Funny Memes!",
  commandOptions: null,
  execute(interaction) {
    request("https://some-random-api.ml/meme", (error, _response, body) => {
      if (error) {
        return message.channel
          .send("Sorry, it appears an error has occurred fetching your meme!")
          .then(() => console.error(error.message));
      }

      const json = JSON.parse(body);
      const {
        id, image, caption, category,
      } = json;

      const emb = new Discord.MessageEmbed();
      emb.setDescription(`${caption} - ${category} #${id}`);
      emb.setColor("GREEN");
      emb.setImage(image);

      client.api.interactions(interaction.id, interaction.token).callback.post({
        data: {
          type: 4,
          data: {
            embeds: [emb],
          },
        },
      });
    });
  },
};
