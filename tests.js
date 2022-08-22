import fetch from "node-fetch";

fetch("https://www.youtube.com/c/miimii/videos?view=0&sort=dd&flow=grid")
	.then(res => res.text())
	.then(html => {
		console.log(html);
	});
