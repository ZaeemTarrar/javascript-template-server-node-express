const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("http-status");
const path = require("path");
const express = require("express");
const { URL_NOT_FOUND } = require("./../../data/static/messages/api/index");
const { uploadPost } = require("../../storage/post");
const { Resize } = require("../../handlers/resizer");

const Init = (app) => {
  // Static
  app.use(express.static(__dirname + "/../shared/"));
  app.use("/public", express.static(__dirname + "/../interface/public/"));

  // View
  app.set("view engine", "ejs");
  app.set("views", path.join(__dirname, "/../interface/secure/"));
  app.use("/", require("./views/index"));

  // Apis
  app.use("/api", require("./apis/public/index"));

  app.post(
    "/testing",
    uploadPost,
    Resize(["snaps", "thumbnails"], "images/post"),
    (req, res) => {
      res.json({ success: true, body: req.body });
    }
  );

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
