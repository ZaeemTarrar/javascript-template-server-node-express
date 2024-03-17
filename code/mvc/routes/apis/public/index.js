const express = require("express");
const { WELCOME } = require("./../../../../data/static/messages/api/index");
const ApiRouteHandler = require("../../../../handlers/apiRoute");

const APIs = express.Router();

APIs.use("/post", require("./post"));

APIs.get("/", (req, res) => res.msg(WELCOME).Go());

module.exports = ApiRouteHandler(APIs);
