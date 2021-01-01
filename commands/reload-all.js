const Discord = require("discord.js");
const fs = require("fs") 
const config = require("../config.json")

module.exports.run = async (client, message, args) => {
    if (message.author.id != config.ownerID) return message.channel.send("Only my developer can use this command...");
    fs.readdir("./commands/", (err, files) => {

    if (err) return console.log(err);

    files.forEach(file => {
 
        if (!file.endsWith(".js")) return;
        
delete require.cache[require.resolve(`./${file}`)];
        
        let props = require(`./${file}`);

        console.log("Successfully reloaded " + file)

        let commandName = file.split(".")[0];

        client.commands.set(commandName, props);
        
    });

});
   } 