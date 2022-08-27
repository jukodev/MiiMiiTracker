require("dotenv").config();
const { REST } = require("@discordjs/rest");

const helpers = require("./helpers");
const { Client, GatewayIntentBits } = require("discord.js");
const api = require("./api");

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let channel = process.env.DISCORD_CHANNEL;

main();

function main() {
	helpers.setCommands();
	client.login(process.env.DISCORD_KEY);
}

client.on("ready", () => {
	helpers.log("Connected to discord as " + client.user.tag);
	client.channels.fetch(channel).then(ch => {
		channel = ch;
	});
});

setInterval(async () => {
	let lastId = helpers.readDB().lastVideo;
	api.req.request().then(res => {
		res = res.data.items[0];
		helpers.log("Request succeeded");
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
	/*api.getLatestVideo().then(res => {
		
	});*/
}, 130000);

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand) return;
	if (interaction.commandName === "watch") {
		let url = interaction.options.get("url").value;
		api.createW2GRoom(url).then(res => {
			interaction.reply(res);
		});
	}
});
