require("dotenv").config();
const ENV = process.env;
const { address } = require("ip");
const MODE = require("../data/static/constants/enums/mode");
const ip = address();

const Configs = {
  MODE: ENV.MODE || MODE.DEV,
  LOGS: false,
  LOG_DATA: false,
  EXP_ENC_LIM: 1e10,
  FILE_UPLOAD_LIM: Number(1 * 1024 * 1024) * 1e10,
  COOKIE_AGE: 60000 * 60,
  TRACK_ERR: Boolean(ENV.TRACK_ERR) || true,
  PROTOCOL: ENV.PROTOCOL || "http",
  IP: ip,
  PORT: ENV.PORT || 3001,
  ALLOW_CORS: "*",
};

Configs.WEB_BASE = () => {
  return Configs.MODE == MODE.DEV
    ? `${Configs.PROTOCOL}://${Configs.IP}:${Configs.PORT}`
    : "";
};

module.exports = Configs;
