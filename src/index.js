#!/usr/bin/env node

require("dotenv").config();
const { REST } = require("@discordjs/rest");
const process = require("process");

const helpers = require("./helpers");
const { Client, GatewayIntentBits } = require("discord.js");
const api = require("./api");
const fetch = (...args) =>
	import("node-fetch").then(({ default: fetch }) => fetch(...args));
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
let channel = process.env.DISCORD_CHANNEL;

main();

function main() {
	process.title = "MiiMiiTracker";
	helpers.setCommands();
	client.login(process.env.DISCORD_KEY);
}

client.on("ready", () => {
	helpers.log(
		"Connected to discord as " +
			client.user.tag +
			", running as " +
			process.title
	);
	client.channels.fetch(channel).then(ch => {
		channel = ch;
	});
});

setInterval(async () => {
	getLatestVideo();
}, process.env.DELAY);

client.on("interactionCreate", async interaction => {
	if (!interaction.isChatInputCommand) return;
	if (interaction.commandName === "watch") {
		let url = interaction.options.get("url").value;
		api.createW2GRoom(url).then(res => {
			interaction.reply(res);
			helpers.log("created w2g room for " + url);
		});
	}
});

function getLatestVideo() {
	fetch(process.env.YOUTUBE_CHANNEL)
		.then(res => res.text())
		.then(html => {
			let indice = html.indexOf(`WEB_PAGE_TYPE_WATCH`);
			let short = html.substring(indice - 50, indice);
			indice = short.indexOf("/watch");
			let indice2 = short.indexOf(`","`);
			let url = "https://youtube.com" + short.substring(indice, indice2);
			indice = html.indexOf(`"runs":[{"text"`);
			short = html.substring(indice + 17, indice + 200);
			indice = short.indexOf(`"}]`);
			let name = short.substring(0, indice);
			indice = html.indexOf(`"thumbnailOverlayTimeStatusRenderer"`);
			short = html.substring(indice + 93, indice + 200);
			indice = short.indexOf(`"}`);
			let duration = short.substring(0, indice);
			duration = duration
				.replace(" Minuten, ", ":")
				.replace(" Sekunden", "");
			if (duration.split(":")[1].length < 2)
				duration =
					duration.split(":")[0] + ":0" + duration.split(":")[1];
			indice = html.indexOf(`[{"url":`);
			short = html.substring(indice + 9, indice + 300);
			indice = short.indexOf(`","`);
			let thumbnail = short.substring(0, indice);
			let data = { url, name, thumbnail, duration };
			processVideo(data);
		})
		.catch(e => helpers.log(e));
}

function processVideo(data) {
	try {
		let lastId = helpers.readDB().lastVideo;
		let allVids = helpers.readDB().allVideos;
		if (
			data &&
			data.name.length > 0 &&
			data.url.length > 0 &&
			data.thumbnail.length > 0 &&
			data.duration.length > 0 &&
			lastId !== data.url &&
			data.url !== "https://youtube.com" &&
			!allVids.includes(data.url)
		) {
			helpers.log("siuuuu");
			api.createW2GRoom(data.url).then(w2g => {
				channel.send({
					embeds: [
						helpers.generateEmbed(
							data.url,
							data.name,
							data.thumbnail,
							data.duration
						),
					],
					components: [helpers.generateButton(w2g)],
				});
				allVids.push(data.url);
				helpers.writeDB({
					lastVideo: data.url,
					lastRoom: w2g,
					allVideos: allVids,
				});
				helpers.log("sent new video: " + data.name);
			});
		}
	} catch (error) {
		helpers.log(error);
	}
}
