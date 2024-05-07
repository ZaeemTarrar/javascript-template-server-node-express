const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("http-status");
const path = require("path");
const express = require("express");
const { URL_NOT_FOUND } = require("./../../data/static/messages/api/index");

const Init = (app) => {
  // Static
  app.use(express.static(__dirname + "/../shared/"));
  app.use("/public", express.static(__dirname + "./../../interface/public/"));
  app.use("/assets", express.static(__dirname + "./../../assets/"));

  // View
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "/../interface/secure/"));
  app.use("/", require("./views/index"));

  // Apis
  app.use("/api", require("./apis/public/index"));

  // Tests
  app.use("/tests", require("./tests/index"));

  // Handlers & Errors
  app.get("*", (req, res) => res.msg(URL_NOT_FOUND).Deal(NOT_FOUND));
  app.get((req, res) => res.msg(URL_NOT_FOUND).Deal(NOT_FOUND));
  app.use((req, res) => res.Deal(INTERNAL_SERVER_ERROR));
  app.use((err, req, res, next) =>
    res.msg(err.message).Deal(INTERNAL_SERVER_ERROR)
  );

  return app;
};

module.exports = Init;
