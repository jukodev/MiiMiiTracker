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
			helpers.log(e);
		});
	return Promise.resolve("https://w2g.tv/rooms/" + data.streamkey);
}

async function getLatestVideo() {
	const req = axios.create({
		baseURL: "https://www.googleapis.com/youtube/v3/search",
		params: {
			part: "snippet",
			channelId: "UCZzGtvgIcthK2cOGvwGGbbA",
			maxResults: 1,
			order: "date",
			type: "video",
			publishedAfter: helpers.readDB().time,
			key: helpers.getKey(),
		},
		Headers: {},
	});

	req.request()
		.then(res => {
			return Promise.resolve(res.data.items[0]);
		})
		.catch(e => helpers.log(e));
}
module.exports = { createW2GRoom, getLatestVideo };
