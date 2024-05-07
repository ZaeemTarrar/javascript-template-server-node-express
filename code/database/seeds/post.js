const posts = require("./../../data/json/post.json").data;
const PostModel = require("./../../mvc/models/post");
const P = require("./../../utils/helpers/printer");
const {
  SEEDS: { SEEDED },
} = require("../../data/static/messages/cmd/index");

const Seed = async () => {
  try {
    await PostModel.insertMany(posts);
    P.Success(SEEDED("Post"));
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = Seed;
