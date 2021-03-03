require('dotenv').config();

const { ShardingManager } = require("discord.js");

const manager = new ShardingManager("./index.js", {
  token: process.env.TOKEN,
  totalShards: 1,
});

manager.on("launch", (shard) => {
  console.log(
    `[${new Date().toString().split(" ", 5).join(" ")}] Launched shard #${
      shard.id
    }`,
  );
});

manager.on("message", (shard, msg) => {
  console.log(
    `[${new Date().toString().split(" ", 5).join(" ")}] #${shard.id} | ${
      msg._eval
    } | ${msg._result}`,
  );
});

manager.spawn();
