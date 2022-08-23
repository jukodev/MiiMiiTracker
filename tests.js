//jojojo
let str =
	Math.random().toString(36).substring(2, 15) +
	Math.random().toString(36).substring(2, 15);
base = new Buffer.from(str).toString("base64");
console.log(base);
