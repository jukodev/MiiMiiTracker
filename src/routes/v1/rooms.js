const { Router } = require("express");
const rooms = Router();
const index = require("../../index");
const api = require("../../api");
const helpers = require("../../helpers");

rooms.get("/", (req, res) => {
	if (!req.query?.url) {
		const err = new Error();
		err.message = 'Missing url parameter "url"';
		err.name = "missing-parameter";
		res.status(401).json(err);
	} else {
		api.createW2GRoom(req.query.url)
			.then(w2g => {
				//index.sendMessageToServer(w2g);
				helpers.log("created w2g room for " + w2g + " from extension");
				res.status(200).json({ data: { url: w2g } });
			})
			.catch(err => {
				res.status(400).json({ err });
			});
	}
});

rooms.get("/arg", (req, res) => {
	res.status(201).json({ msg: "arg" });
});

module.exports = rooms;
