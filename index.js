require("dotenv").config();
const axios = require("axios");
const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({ intents: [] });

client.on("ready", () => {
	console.log("moin");
});

client.login(process.env.DISCORD_KEY);
