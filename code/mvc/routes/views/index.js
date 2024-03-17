const express = require("express");
const Views = express.Router();

Views.get("/", (req, res) => res.render("pages/index.ejs"));
Views.get("/database", async (req, res) =>
  res.render("pages/database.ejs", { schema: [], data: [] })
);

module.exports = Views;
