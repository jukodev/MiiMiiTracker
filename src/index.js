require("dotenv").config();
const { Client } = require("discord.js");
const api = require("./src/api");

const client = new Client({ intents: [] });

client.on("ready", () => {
	console.log("moin");
});

client.login(process.env.DISCORD_KEY);
