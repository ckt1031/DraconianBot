require('dotenv').config()

const { ShardingManager } = require("discord.js");
const Statcord = require("statcord.js");

const manager = new ShardingManager("./index.js", {
  token: process.env.TOKEN,
  totalShards: 1,
});

const statcord = new Statcord.ShardingClient({
  key: process.env.STATCORD_API,
  manager,
  postCpuStatistics: true,
  postMemStatistics: true,
  postNetworkStatistics: true,
  autopost: true,
});

statcord.registerCustomFieldHandler(1, async (manager) => {
  console.log("Successful posted handler 1");
});

statcord.registerCustomFieldHandler(2, async (manager) => {
  console.log("Successful posted handler 2");
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

statcord.on("autopost-start", () => {
  console.log("Started autopost");
});

statcord.on("post", (status) => {
  if (!status) console.log("Successful post");
  else console.error(status);
});