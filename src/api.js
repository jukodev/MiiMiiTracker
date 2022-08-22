const axios = require("axios");
require("dotenv");

async function createW2GRoom(uri) {
	const { data } = await axios
		.post("https://w2g.tv/rooms/create.json", {
			w2g_api_key: process.env.W2G_API_KEY,
			share: uri,
			bg_color: "#2a354c",
			bg_opacity: "85",
		})
		.catch(e => console.log(e));
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
			key: "AIzaSyDU7zyvRnYr3Z7-Ht8ue-SdyF_t66aNMKE",
		},
		Headers: {},
	});
	const res = await req.request().catch(e => console.log(e));
	return Promise.resolve(res.data.items[0]);
}
module.exports = { createW2GRoom, getLatestVideo };
