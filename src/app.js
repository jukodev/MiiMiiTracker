#!/usr/bin/env node

const express = require("express");
const logger = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const helpers = require("./helpers");
const rooms = require("./routes/v1/rooms");
const index = require("./index");
const app = express();

app.use(cors({ origin: "*" }));
app.use(logger("dev"));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
	res.send("mii mii");
});

app.use("/rooms", rooms);

app.listen(process.env.PORT || 4000, () => {
	helpers.log("server is running");
	index.main();
});
