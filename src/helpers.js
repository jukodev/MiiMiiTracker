const fs = require("fs");
const { REST } = require("@discordjs/rest");

const {
	EmbedBuilder,
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Routes,
} = require("discord.js");
require("dotenv");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_KEY);

async function setCommands() {
	const commands = [
		{
			name: "watch",
			description: "creates W2G room",
			options: [
				{
					name: "url",
					description: "video to watch",
					type: 3,
					required: true,
				},
			],
		},
	];

	await rest
		.put(
			Routes.applicationGuildCommands(
				process.env.DISCORD_APPID,
				process.env.GUILD_ID
			),
			{ body: commands }
		)
		.then(() => log("Registered commands"))
		.catch(log);
}

function log(str) {
	let date = new Date();
	console.log("[" + date.toString().split(" GMT")[0] + "] " + str);
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
		.setTitle(title.length > 0 ? title : "error")
		.setURL(url.length > 0 ? url : "error")
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

function generate32BitID() {
	let str =
		Math.random().toString(36).substring(2, 15) +
		Math.random().toString(36).substring(2, 15);
	base = new Buffer.from(str).toString("base64");
	return base;
}

module.exports = {
	readDB,
	writeDB,
	generateButton,
	generateEmbed,
	generate32BitID,
	log,
	setCommands,
};
