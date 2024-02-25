const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("http-status");
const express = require("express");
const Views = express.Router();

Views.get("/", (req, res) => res.render("pages/index.ejs"));
Views.get("/database", async (req, res) =>
  res.render("pages/database.ejs", { schema: [], data: [] })
);

// Views.get("*", (req, res) => res.RF(NOT_FOUND, URL_NOT_FOUND));
// Views.get((req, res) => res.RF(INTERNAL_SERVER_ERROR));

module.exports = Views;
