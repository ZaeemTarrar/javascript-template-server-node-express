const http = require("http");
const express = require("express");
const Handler = require("./code/handlers/error/handler");
const Events = require("./code/performance/events/index");
const MongoDB = require("./code/database/connection/index");
const Seeds = require("./code/database/seeds/index");
const Pipes = require("./code/performance/pipes/index");
const { WEB_BASE, PORT } = require("./code/configs/meta");
const P = require("./code/utils/helpers/printer");
const InitMiddlewares = require("./code/mvc/middlewares/init");
const InitRoutes = require("./code/mvc/routes/init");

const Launch = async () => {
  P.Clear();
  P.Welcome();

  let app = express();
  app = InitMiddlewares(app);
  app = InitRoutes(app);

  const server = http.createServer(app);

  await MongoDB.Connect();
  await MongoDB.Refresh();
  await Seeds();
  await Pipes(server);
  await Events.emit("connection");

  server.listen(PORT, async () => {
    P.Heading("EXECUTION");
    P.Link("Thread ProcessId", +process.pid);
    P.Link("Listening at", `${WEB_BASE()}/`);
  });
};

module.exports = Handler(Launch);
