require("dotenv").config();
const helpers = require("./helpers");
const { Client } = require("discord.js");
const api = require("./api");

const client = new Client({ intents: [] });
let channel = "751751901338664995";

client.on("ready", () => {
	console.log("connected");
	client.channels.fetch(channel).then(ch => {
		channel = ch;
	});
});

setInterval(async () => {
	let lastId = helpers.readDB().lastVideo;
	api.getLatestVideo().then(res => {
		console.log("success");

		if (res?.id && lastId != res.id.videoId) {
			api.createW2GRoom(
				`https://youtube.com/watch?v=${res.id.videoId}`
			).then(w2g => {
				channel.send({
					embeds: [
						helpers.generateEmbed(
							`https://youtube.com/watch?v=${res.id.videoId}`,
							res.snippet.title,
							res.snippet.thumbnails.default.url
						),
					],
					components: [helpers.generateButton(w2g)],
				});

				helpers.writeDB({
					lastVideo: res.id.videoId,
					lastRoom: w2g,
					time: res.snippet.publishedAt,
				});
			});
		}
	});
}, 3000);

client.login(process.env.DISCORD_KEY);
