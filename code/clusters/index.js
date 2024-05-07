const cluster = require("cluster");
const os = require("os");
const cpuCount = os.cpus().length;
const cpuCountToUse = Math.round(cpuCount);
const ServerUrl = __dirname + "/../../app.js";

cluster.setupPrimary({ exec: ServerUrl });
if (cluster.isPrimary) {
  for (let i = 0; i < cpuCountToUse; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => cluster.fork());
}
