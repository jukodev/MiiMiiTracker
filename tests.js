const lib = require("lib")({ token: process.env.DISCORD_KEY });

await lib.discord.channels["@0.3.0"].messages.create({
	channel_id: `${context.params.event.channel_id}`,
	content: "",
	tts: false,
	components: [
		{
			type: 1,
			components: [
				{
					style: 1,
					label: `Watch Now`,
					custom_id: `row_2_button_0`,
					disabled: false,
					type: 2,
				},
			],
		},
	],
	allowed_mentions: {
		replied_user: false,
		parse: ["everyone"],
	},
	embeds: [
		{
			type: "rich",
			title: `Neuer MiiMii Banger!`,
			description: `meine ENTSCHULDIGUNG an APORED 8`,
			color: 0xf6ff00,
			image: {
				url: `https://i.ytimg.com/vi/R5Kr4kdt2Cw/hqdefault.jpg?sqp=-oaymwEcCPYBEIoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAGHBP9ckIhqY9F0gOrfCt6IfDSpA`,
				height: 0,
				width: 0,
			},
			thumbnail: {
				url: `https://yt3.ggpht.com/ytc/AMLnZu9G_2Tt4d2Sf3xHoCEN_JW3eL4bDqD7OiTHnJGimA=s88-c-k-c0x00ffffff-no-rj`,
				height: 0,
				width: 0,
			},
			footer: {
				text: `►MERCH-SHOP: 3dsupply.de/de/miimii ᵂᴱᴿᴮᵁᴺᴳ\n►INSTAGRAM: https://instagram.com/miimii/\n►TWITTER: https://twitter.com/MiiMiiTV\n❤️Kanalmitglied werden: https://www.youtube.com/miimii/join\n\n-Entschuldigung 7: https://www.youtube.com/watch?v=Vgz1r...\n-OpenJur: https://openjur.de/u/2341004.html`,
			},
			url: `https://google.com`,
		},
	],
});
