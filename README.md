<p align="center">
    <img src="https://cdn.koolisw.tk/file/kooliswCDN/F996F49F-5771-452D-9FA4-2E6713D2E138.png" height="200">
</p>
<p align="center">
<img src="https://img.shields.io/uptimerobot/ratio/m787007739-f881254df38f1a06bbd53346?style=flat-square"
            alt="Uptime">
    <img alt="Discord" src="https://img.shields.io/discord/687219262406131714?label=Discord">
    <a href="https://top.gg/bot/711937599975063584">
    <img src="https://top.gg/api/widget/status/711937599975063584.svg" alt="Draconian" />
</a>
    <a href="https://top.gg/bot/711937599975063584">
    <img src="https://top.gg/api/widget/servers/711937599975063584.svg" alt="Draconian" />
</a>
    </p>

# Draconian Discord Bot

Draconian Discord bot is an epic multi-purpose bot, which is very powerful and contains rich functions below.\
Please invite me [here](https://discord.com/api/oauth2/authorize?client_id=711937599975063584&permissions=8&scope=bot)!

[點擊這裏](https://github.com/RealKoolisw/DraconianJSBot/blob/main/assets/README-cn.md)閱讀Discord機器人中文教程 :)
## Our Bot Features:
Draconian Discord Bot offers:
* :battery: 24/7 Full Uptime with high stability
* :smiley: Easy to use
* ⚙ Per-Server Settings
* :+1: Fast command responses
* :cop: Powerful Moderation Commands
* :tada: Giveaways Commands
* :file_folder: Persistent Database based in `Enmap`
* :rocket: Support for different languages(Coming Soon)

##### ⚠Admin Permission needed for Moderation commands
##### ⚠Embed links needed for bot embed messages

## Featured Commands:
We have more than 80 commands in this bot, and they are **featured** and having 8 main categories
* ⚙ **Customization Functions:** `setprefix` and more **coming soon**!
* :gift: **Giveaways:** `gstart`, `gend`, `greroll`
* :file_folder: **Info:** `help`, `uptime`, `vote`, `channel`, `stats`, `whois`, and **5 more!**
* :stars: **Images:** `cat`, `changemymind`, `gay`, `trigger`, `circle`, and **7 more!**
* :soccer: **Fun:** `8ball`, `reverse`, `snipe`, and **4 more!**
* :musical_note: **Music:** `play`, `loop`, `skip`, `stop`, `jumpto`, `volume`, and **4 more!**
* :lock: **Moderation:** `ban`, `kick`, `warn`, `mute`, `createchannel`, `createemoji`, and **9 more!**
* :electric_plug: **Utility:** `weather`, `aes256`, `embed`, `enlarge`, and **4 more!**

## Screenshots and Examples
You can see those command examples and screenshots [here](https://github.com/RealKoolisw/DraconianJSBot/tree/main/assets)

## Issue/Suggestions
If met any issues, go [here](https://github.com/RealKoolisw/Draconian/issues) to report bug and create new issue for supporting

## Github Repository
Draconian Made by Koolisw, project [Here](https://github.com/RealKoolisw/Draconian)

## Self-Hosting & Development
Requirement:
- Node.js v12.x or upper
- Python (For Advanced Music feature)

Reminders:
- If you are not using Discord Bot lists and top.gg, delete files from `handlers/dbl-loader.js` / `events/dbl/all-files` and removes all codes from index.js with `//`
- If you are using Top.gg bot lists API, u need to delete `//` from commands lines from index.js
- If you are not using .env supported hosters, please add code `require('dotenv').config()` to the top of the code from `index.js`, `shard.js` and other place are needed to use `process.env.(stuff)`

1. To get Draconian ready to run locally, the first step is to clone this repository onto the machine you wish to run it on.
2. **Node.js version 12 or newer is recommended to run Draconian since we are using Discord.js v12**
3. Use NPM to install the dependencies from the project folder: `npm install`
4. Edit/create the file `.env` (or your hoster's provided environment secret) and insert your bot token in `TOKEN` value.
5. Start the bot from the project folder: `node shard.js`
6. Open `http://localhost:8080/` or your project URL to view the http output.
