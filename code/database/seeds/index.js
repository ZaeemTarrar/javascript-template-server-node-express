const P = require("./../../utils/helpers/printer");
const UserSeed = require("./user");
const PostSeed = require("./post");

module.exports = async () => {
  P.Heading("DATABASE SEEDS");
  await UserSeed();
  await PostSeed();
};
