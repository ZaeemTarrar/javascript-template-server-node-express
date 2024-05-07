const users = require("./../../data/json/user.json").data;
const UserModel = require("./../../mvc/models/user");
const P = require("./../../utils/helpers/printer");
const {
  SEEDS: { SEEDED },
} = require("../../data/static/messages/cmd/index");

const Seed = async () => {
  try {
    await UserModel.insertMany(users);
    P.Success(SEEDED("User"));
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = Seed;
