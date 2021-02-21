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

Draconian 是一個史詩多功能的機器人, 擁有相對豐富的功能以及眾多指令\
[點擊這裏](https://discord.com/api/oauth2/authorize?client_id=711937599975063584&permissions=8&scope=bot)邀請我進入你的伺服器!

[Click Here](https://github.com/RealKoolisw/DraconianJSBot/blob/main/README.md) for an english list :)
## 機器人功能:
* :battery: 24/7 高度全天候上線及穩定指令功能
* :smiley: 容易上手
* ⚙ 可以為不同伺服器進行其不同的設定
* :+1: 快速指令回應
* :cop: 相對強大的管理指令
* :tada: 抽獎指令
* :file_folder: 基於`Enmap`的穩定永久儲存庫數據
* :rocket: 不同國籍語言的支援(即將推出)

##### ⚠管理指令必須擁有在其伺服器的管理權限才能夠運作
##### ⚠必須擁有 Embed Links 的伺服器權限才能夠發送 Embed 訊息

## 特色指令:
我們的機器人擁有 **超過80** 個指令, 而他們是擁有各種特色的, 並且分別分類為 **八大類別!**
* ⚙ **自定義功能:** `setprefix` and more **coming soon**!
* :gift: **抽獎:** `gstart`, `gend`, `greroll`
* :file_folder: **資訊型:** `help`, `uptime`, `vote`, `channel`, `stats`, `whois`, and **5 more!**
* :stars: **圖像或影像:** `cat`, `changemymind`, `gay`, `trigger`, `circle`, and **7 more!**
* :soccer: **娛樂:** `8ball`, `reverse`, `snipe`, and **4 more!**
* :musical_note: **音樂及串流:** `play`, `loop`, `skip`, `stop`, `jumpto`, `volume`, and **4 more!**
* :lock: **管理:** `ban`, `kick`, `warn`, `mute`, `createchannel`, `createemoji`, and **9 more!**
* :electric_plug: **實用及工具型:** `weather`, `aes256`, `embed`, `enlarge`, and **4 more!**

## 螢幕截圖及使用方法
[在此](https://github.com/RealKoolisw/DraconianJSBot/tree/main/assets)你可以看到機器人的使用方式

## 問題及建議
如果有任何問題及建議, 請前往[這裏](https://github.com/RealKoolisw/Draconian/issues)去報告機器人運作問題及建議

## 自行托管及部署
需求:
- Node.js版本(運作引擎) v12.x 及更高
- Python (進階音樂功能 - 選用)

溫馨提示:
- 若果你不是使用任何機器人的顯示網站 (Discord Bot lists) 或者 top.gg, 請你在 `handlers/dbl-loader.js` / `events/dbl/all-files` 中刪除所有檔案 並且在 **index.js** 中含有 `//`的代碼行刪除
- 不建議你直接使用此Open Source機器人代碼直接放上Bot Lists

1. To get Draconian ready to run locally, the first step is to clone this repository onto the machine you wish to run it on.
2. **Node.js version 12 or newer is recommended to run Draconian since we are using Discord.js v12**
3. Use NPM to install the dependencies from the project folder: `npm install`
4. Edit/create the file `.env` (or your hoster's provided environment secret) and insert your bot token in `TOKEN` value.
5. Start the bot from the project folder: `node shard.js`
6. Open `http://localhost:8080/` or your project URL to view the http output.
