require("dotenv").config();
const ENV = process.env;
const MODE = require("./../data/static/constants/enums/mode");

const Configs = {
  MODE: ENV.MODE || MODE.DEV,
  LOGS: Boolean(ENV.LOGS) || true,
  PORT: ENV.PORT || 3001,
  WEB_BASE() {
    return ENV.MODE == MODE.DEV ? "http://localhost:3000" : "";
  },
};

module.exports = Configs;
