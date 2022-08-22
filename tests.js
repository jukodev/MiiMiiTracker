const api = require("./src/api");
const db = require("./src/helpers");

api.getLatestVideo().then(res => {
	console.log(res);
});
api.createW2GRoom("asdasdasd").then(res => {
	console.log(res);
});

db.writeDB({ oksace: "asd" });
