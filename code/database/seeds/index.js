const P = require("./../../utils/helpers/printer");
const UserSeed = require("./user");
const PostSeed = require("./post");

module.exports = async () => {
  try {
    P.Heading("DATABASE SEEDS");
    await UserSeed();
    await PostSeed();
  } catch (err) {
    P.Error("DATABASE SEEDS: ", err.message);
  }
};
