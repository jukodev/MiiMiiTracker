const fs = require("fs");

function readDB() {
	let raw = fs.readFileSync("./storage/db.json");
	return JSON.parse(raw);
}
function writeDB(data) {
	let temp = JSON.stringify(data);
	fs.writeFileSync("./storage/db.json", temp);
}

module.exports = { readDB, writeDB };
