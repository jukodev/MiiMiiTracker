const { Router } = require("express");
const w2g = Router();
const index = require("../../index");
const api = require("../../api");
const helpers = require("../../helpers");
const { requireAuth } = require("../../tools/middlewares");

w2g.post("/", requireAuth, (req, res) => {
	if (!req.body?.url) {
		const err = new Error();
		err.message = 'Missing url parameter "url"';
		err.name = "missing-parameter";
		res.status(402).json(err);
	} else {
		api.createW2GRoom(req.body.url)
			.then(w2g => {
				index.sendMessageToServer(w2g);
				helpers.log("created w2g room for " + w2g + " from extension");
				res.status(200).json({ data: { url: w2g } });
			})
			.catch(err => {
				res.status(400).json({ err });
			});
	}
});

module.exports = w2g;
