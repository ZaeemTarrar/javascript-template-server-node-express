require("dotenv").config();
const ENV = process.env;

const DB = {
  NAME: ENV.DB_NAME || "node-server",
  USER: ENV.DB_USER || "",
  PASS: ENV.DB_PASS || "",
  HOST: ENV.DB_HOST || "localhost",
  PORT: ENV.DB_PORT || "27017",
  OPTIONS: {
    autoIndex: true,
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 100000,
    family: 4,
  },
};

const Configs = {
  ...DB,
  MONGO_DB_LINK() {
    const { USER, PASS, NAME, HOST, PORT } = Conf.DB;
    return ENV.MODE == "PRODUCTION"
      ? `mongodb+srv://${USER}:${PASS}@${NAME}.pd5v1ct.mongodb.net/?retryWrites=true&w=majority`
      : `mongodb://${HOST}:${PORT}/${NAME}`;
  },
  MONGO_DB_OPTIONS(auth = false) {
    const { OPTIONS, USER, PASS } = DB;
    if (auth) return { ...OPTIONS, user: USER, pass: PASS };
    else return OPTIONS;
  },
};

module.exports = Configs;
