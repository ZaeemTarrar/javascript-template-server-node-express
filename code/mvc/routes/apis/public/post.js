const express = require("express");
const Con = require("./../../../controllers/post");
const ErrWrap = require("../../../../handlers/error/apiHandler");
const ApiRouteHandler = require("../../../../handlers/apiRoute");
const { Upload } = require("../../../../storage");

const uploadSnap = Upload("images/post/snaps", 10);
const uploadVideo = Upload("videos/post/videos", 1000);

const APIs = express.Router();

APIs.get("/stream", ErrWrap(Con.fetchAllStream));

APIs.get("/count", ErrWrap(Con.count));
APIs.get("/", ErrWrap(Con.fetchAll));
APIs.get("/:id", ErrWrap(Con.fetchOne));

APIs.post("/search", ErrWrap(Con.search));
APIs.post("/filter", ErrWrap(Con.filter));
APIs.post("/create", uploadSnap.single("snap"), ErrWrap(Con.create));

APIs.put("/update/:id", ErrWrap(Con.update));

APIs.patch("/changeSnap", ErrWrap(Con.changeSnap));

APIs.delete("/remove/:id", ErrWrap(Con.remove));
APIs.delete("/removeAll", ErrWrap(Con.removeAll));

module.exports = ApiRouteHandler(APIs);
