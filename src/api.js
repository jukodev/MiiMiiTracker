const axios = require("axios");
const helpers = require("./helpers");
require("dotenv");

async function createW2GRoom(uri) {
	const { data } = await axios
		.post("https://w2g.tv/rooms/create.json", {
			w2g_api_key: process.env.W2G_API_KEY,
			share: uri,
			bg_color: "#2a354c",
			bg_opacity: "85",
		})
		.catch(e => {
			console.log(e);
		});
	return Promise.resolve("https://w2g.tv/rooms/" + data.streamkey);
}

async function getLatestVideo() {
	const req = axios.create({
		baseURL: "https://www.googleapis.com/youtube/v3/search",
		params: {
			part: "snippet",
			channelId: "UC2zKTWCDV582rioecXKwxNQ", //"UCZzGtvgIcthK2cOGvwGGbbA",
			maxResults: 1,
			order: "date",
			type: "video",
			publishedAfter: helpers.readDB().time,
			key: process.env.YOUTUBE_KEY,
		},
		Headers: {},
	});

	const res = await req.request().catch(e => console.log(e));
	return Promise.resolve(res.data.items[0]);
}
module.exports = { createW2GRoom, getLatestVideo };
