const { Router } = require("express");
const rooms = Router();
const index = require("../../index");

rooms.get("/", (req, res) => {
	if (!req.query?.url) {
		const err = new Error();
		err.message = 'Missing url parameter "url"';
		err.name = "missing-parameter";
		res.status(401).json(err);
	} else {
		index.sendW2GFromUrl(req.query.url);
		res.status(200).json({ msg: "hagebuddn" });
	}
});

module.exports = rooms;
