require("dotenv").config();
const db = require("./helpers");
const { Client } = require("discord.js");
const api = require("./api");

const client = new Client({ intents: [] });
let channel = "751751901338664995";

client.on("ready", () => {
	console.log("moin");
	client.channels.fetch(channel).then(ch => {
		channel = ch;
	});
});

setInterval(async () => {
	let lastId = db.readDB().lastVideo;
	api.getLatestVideo().then(res => {
		console.log(res);
		if (lastId != res.id.videoId) {
			channel.send("neues video ihr hunde: " + res.snippet.title);
			db.writeDB({ lastVideo: res.id.videoId });
		}
	});
}, 10000);

client.login(process.env.DISCORD_KEY);
