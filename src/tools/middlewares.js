const fs = require("fs");
const bcrypt = require("bcrypt");

const requireAuth = (req, res, next) => {
	const auth = req.header("Authorization");

	const type = auth?.split(" ")[0];
	const credentials = auth?.split(" ")[1];
	if (type !== "Bearer" || !credentials) {
		let error = new Error();
		error.message = "Missing token";
		error.name = "auth.unauthorized";
		res.status(401).json(error);
	} else if (
		bcrypt.compareSync(
			credentials,
			fs.readFileSync(__dirname + "/../../storage/token").toString()
		)
	) {
		next();
	} else {
		const error = new Error();
		error.message = "Invalid token";
		error.name = "auth.unauthorized";
		res.status(401).json(error);
	}
};

module.exports = { requireAuth };
