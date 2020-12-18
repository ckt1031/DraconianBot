require("dotenv").config();

const Enmap = require("enmap");
const Discord = require("discord.js");
const client = new Discord.Client({
    disableMentions: "all"
});
const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const http = require("http");
const express = require("express");
const app = express();
const config = require("./config.json");
const fs = require("fs");
const queue = new Map();
client.config = config;
client.login(process.env.TOKEN);
var scount = client.guilds.size;
const db = require("quick.db");
const DBL = require("dblapi.js");
const dbl = new DBL(process.env.DBLTOKEN, client);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.emotes = client.config.emotes;
client.colors = client.config.colors;
client.queue = queue;
const cooldowns = new Discord.Collection();
const settings = require("./settings.js");

const blapi = require("blapi");
const apiKeys = {
    "arcane-center.xyz": "043027ce7ef1b3e835df5e53c5460dabde3357c4b3b88c9e0aefbda1ba42226da19880f4ca05592b386232d67004fc70408018938626dd8b9751c3a50f61eff1", // Add other bot lists as needed
    "botlist.space": "7d96f8dc85fde4969a3925b5e8772a08e59eec6f3799d7f91ae810f334e0826fe677b8a8d2c0826df3a16f94fe0f4589",
    "bladebotlist.xyz/": "M3joAEZfPMASSrH.HaLR65YoXbpkOzZ.LdTzC585ki5KW1g",
    "discord.boats": "mkmxT1hd51cX7DkEVAIkvYAgJHNSqZUrKwvZxSnidzhHR41A4qskvhGYaO3i5EP3j5LarjZce7QAA6BdsXSXQXi48Zlz6iQ4kvtxqTolvS1Tmx9vc5RnMjEiqkaFreAbZVUgJIdHVAD7hP1vgWeJTeFB0GP",
    "space-bot-list.xyz": "a-tAOZLTAfQpVZZi2HX2qHJ3zqN-WNpMA6JEYtBO35KIIT.FVA",
    "topcord.xyz": "79e9aSQplwC4Funr1MLbfy2JOuvAjgKz",
    "botsdatabase.com": "8eb4397b32d5d81dc79340cd23fa7043563c11002eb08408e25aca6c95554d6c6f128213a589a5a432cb113e920fb670cda7fabaaf9f998c",
    "mythicalbots.xyz": "mythicalbots.xyz"
};
blapi.handle(client, apiKeys, 60);

client.settings = new Enmap({
    name: "settings",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: "deep"
});

dbl.on("posted", () => {
    console.log("Server count posted!");
});

dbl.on("error", e => {
    console.log(`Oops! ${e}`);
});

fs.readdir("./commands/", (err, files) => {
    const jsfiles = files.filter(f => f.split(".").pop() === "js");

    if (jsfiles.length <= 0) {
        return console.log("Couldn't find any commands!");
    }

    jsfiles.forEach(file => {
        console.log(`Loading command ${file}`);
    });
});

if (!db.get("giveaways")) db.set("giveaways", []);

const {
    GiveawaysManager
} = require("discord-giveaways");
const GiveawayManagerWithOwnDatabase = class extends GiveawaysManager {
    // This function is called when the manager needs to get all the giveaway stored in the database.
    async getAllGiveaways() {
        // Get all the giveaway in the database
        return db.get("giveaways");
    }

    // This function is called when a giveaway needs to be saved in the database (when a giveaway is created or when a giveaway is edited).
    async saveGiveaway(messageID, giveawayData) {
        // Add the new one
        db.push("giveaways", giveawayData);
        // Don't forget to return something!
        return true;
    }

    async editGiveaway(messageID, giveawayData) {
        // Gets all the current giveaways
        const giveaways = db.get("giveaways");
        // Remove the old giveaway from the current giveaways ID
        const newGiveawaysArray = giveaways.filter(
            giveaway => giveaway.messageID !== messageID
        );
        // Push the new giveaway to the array
        newGiveawaysArray.push(giveawayData);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }

    // This function is called when a giveaway needs to be deleted from the database.
    async deleteGiveaway(messageID) {
        // Remove the giveaway from the array
        const newGiveawaysArray = db
            .get("giveaways")
            .filter(giveaway => giveaway.messageID !== messageID);
        // Save the updated array
        db.set("giveaways", newGiveawaysArray);
        // Don't forget to return something!
        return true;
    }
};

// Create a new instance of your new class
const manager = new GiveawayManagerWithOwnDatabase(client, {
    storage: false, // Important - use false instead of a storage path
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});
// We now have a giveawaysManager property to access the manager everywhere!
client.giveawaysManager = manager;
// We now have a client.giveawaysManager property to manage our giveaways!

client.giveawaysManager.on(
    "giveawayReactionAdded",
    (giveaway, member, reaction) => {
        console.log(
            `${member.user.tag} entered giveaway #${giveaway.messageID} (${reaction.emoji.name})`
        );
    }
);

client.giveawaysManager.on(
    "giveawayReactionRemoved",
    (giveaway, member, reaction) => {
        console.log(
            `${member.user.tag} unreact to giveaway #${giveaway.messageID} (${reaction.emoji.name})`
        );
    }
);

client.on("ready", async () => {
    client.user.setActivity(`RealKoolisw | ${client.guilds.cache.size} Servers`, {
        type: "LISTENING"
    });
    console.log("Ready!");

    setInterval(() => {
        client.user.setActivity(
            `RealKoolisw | ${client.guilds.cache.size} Servers`, {
                type: "LISTENING"
            }
        );
    }, 5000);
});

client.on("guildCreate", guild => {
    client.settings.ensure(guild.id, settings);
    client.user.setActivity(`RealKoolisw | ${client.guilds.cache.size} Servers`, {
        type: "LISTENING"
    });
});
client.on("guildDelete", guild => {
    client.settings.delete(guild.id);
    client.user.setActivity(`RealKoolisw | ${client.guilds.cache.size} Servers`, {
        type: "LISTENING"
    });
});

client.snipes = new Map();
client.on("messageDelete", function(message, channel) {
    client.snipes.set(message.channel.id, {
        content: message.content,
        author: message.author.tag,
        image: message.attachments.first() ?
            message.attachments.first().proxyURL :
            null
    });
});

client.on("error", function(error) {
    console.error(`client's WebSocket encountered a connection error: ${error}`);
});
client.on("disconnect", function(event) {
    console.log(
        `The WebSocket has closed and will no longer attempt to reconnect`
    );
});

client.on("message", async message => {
    const guildConf = client.settings.ensure(message.guild.id, settings);

    const prefixx = client.settings.get(message.guild.id, "prefix");

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: config.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;

    const escapeRegex = str => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(
        `^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`
    );
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);

    if (!message.content.startsWith(matchedPrefix)) return;

    if (message.author.bot) return undefined;
    if (!message.content.startsWith(matchedPrefix)) return undefined;

    let command = message.content.toLowerCase().split(" ")[0];
    command = command.slice(matchedPrefix.length);
    let args = message.content
        .slice(matchedPrefix.length)
        .trim()
        .split(" ");
    let cmd = args.shift().toLowerCase();

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 1) * 1000;
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(
                `:x: Please wait **${timeLeft.toFixed(
          1
        )} seconds** before reusing the **${prefix}${command}**!`
            );
        }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
    } catch (e) {
        console.log(e.message);
    } finally {
        console.log(`${message.author.username} using command ${cmd}`);
    }
});

function delay(delayInms) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(2);
        }, delayInms);
    });
}