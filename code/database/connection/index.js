const MODE = require("./../../data/static/constants/enums/mode");
const META = require("./../../configs/meta");
const { MONGO_DB_LINK, MONGO_DB_OPTIONS } = require("./../../configs/database");
const P = require("./../../utils/helpers/printer");
const Notes = require("./../../data/static/messages/cmd/index").DB;
const mongoose = require("mongoose");

let db = null;

const CollectionDropper = async () => {
  try {
    if (META.MODE == MODE.DEV && db != null)
      await db.dropDatabase(), P.Success(Notes.REFRESHED);
  } catch (err) {
    throw new Error(err);
  }
};

const MongoConnection = async () => {
  return new Promise((resolve, reject) => {
    try {
      const DB = mongoose.connect(MONGO_DB_LINK(), MONGO_DB_OPTIONS(false));
      db = mongoose.connection;
      db.on("error", (err) => reject(err));
      db.once("open", async () => {
        if (META.MODE == MODE.PROD) await db.dropDatabase();
        P.Heading(Notes.TITLE), P.Link(Notes.CONNECTED, MONGO_DB_LINK());
        resolve();
      });
    } catch (error) {
      throw new Error(error);
    }
  });
};

module.exports = { Connect: MongoConnection, Refresh: CollectionDropper };
