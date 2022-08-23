const fs = require("fs");
const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
} = require("discord.js");
require("dotenv");

let currentKey = 0;
let keys = process.env.YOUTUBE_KEYS.split(",");

function getKey() {
	let key = keys[currentKey];
	if (currentKey < keys.length - 1) currentKey++;
	else currentKey = 0;
	return key;
}

function readDB() {
	let raw = fs.readFileSync("./storage/db.json");
	return JSON.parse(raw);
}
function writeDB(data) {
	let temp = JSON.stringify(data);
	fs.writeFileSync("./storage/db.json", temp);
}
function generateEmbed(url, title, imageUrl) {
	return new EmbedBuilder()
		.setColor(0xfed962)
		.setTitle(title)
		.setURL(url)
		.setAuthor({
			name: "Neuer MiiMii Banger",
			iconURL:
				"https://yt3.ggpht.com/ytc/AMLnZu9G_2Tt4d2Sf3xHoCEN_JW3eL4bDqD7OiTHnJGimA=s88-c-k-c0x00ffffff-no-rj",
			url: "https://discord.js.org",
		})
		.setImage(imageUrl)
		.setTimestamp()
		.setFooter({
			text: "Huiuiuiui",
		});
}

function generateButton(url) {
	return new ActionRowBuilder().addComponents(
		new ButtonBuilder()
			.setStyle(ButtonStyle.Link)
			.setLabel("Rein in den Lachs")
			.setURL(url)
	);
}
module.exports = { readDB, writeDB, generateButton, generateEmbed, getKey };
