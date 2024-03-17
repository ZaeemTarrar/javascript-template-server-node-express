const PostModel = require("./../models/post");
const { Transform } = require("stream");
const { POST: Notes } = require("./../../data/static/messages/api/index").API;

module.exports.fetchAllStream = async (req, res) => {
  const transformData = new Transform({ objectMode: true });
  transformData.isWritten = false;

  transformData._transform = function (chunk, encoding, callback) {
    if (!this.isWritten) {
      this.isWritten = true;
      callback(null, "[" + JSON.stringify(chunk));
    } else callback(null, "," + JSON.stringify(chunk));
  };
  transformData._flush = (callback) => callback(null, "]");

  const posts = PostModel.find().cursor().pipe(transformData);
  posts.pipe(res);
};

module.exports.count = async (req, res) => {
  const postCount = await PostModel.Count();
  res.msg(Notes.COUNT).Go({ count: postCount });
};

module.exports.fetchAll = async (req, res) => {
  const { NONE_FOUND, ALL_FOUND } = Notes;
  const { skip, limit } = req.query;
  const posts = await PostModel.FetchAll(skip, limit);
  res.msg(posts.length == 0 ? NONE_FOUND : ALL_FOUND).Go(posts);
};

module.exports.fetchOne = async (req, res) => {
  const { NOT_FOUND, FOUND } = Notes;
  const post = await PostModel.FetchOne(req.params.id);
  res.msg(post ? FOUND : NOT_FOUND).Go(post);
};

module.exports.search = async (req, res) => {
  const { FOUND_ONE, NOT_FOUND } = Notes;
  const { id, title, description } = req.body;
  const { type } = req.query;
  const post = await PostModel.Search(type, { _id: id, title, description });
  res.msg(post ? FOUND_ONE : NOT_FOUND).Go(post);
};

module.exports.filter = async (req, res) => {
  const { NONE_FOUND, ALL_FOUND } = Notes;
  const { id, title, description } = req.body;
  const { type, skip, limit } = req.query;
  const filter = { _id: id, title, description };
  const posts = await PostModel.Filter(type, filter, skip, limit);
  console.log("Posts: ", posts);
  res.msg(posts.length > 0 ? ALL_FOUND : NONE_FOUND).Go(posts);
};

module.exports.create = async (req, res) => {
  const { CREATED, NOT_CREATED } = Notes;
  const newPost = await PostModel.Create(req.body, req.file);
  res.msg(newPost ? CREATED : NOT_CREATED).Go(newPost);
};

module.exports.update = async (req, res) => {
  const { UPDATED, NOT_UPDATED } = Notes;
  const updated = await PostModel.Update(req.params.id, req.body);
  res.msg(updated ? UPDATED : NOT_UPDATED).Go(updated);
};

module.exports.changeSnap = async (req, res) => {};

module.exports.remove = async (req, res) => {
  const deleted = await PostModel.RemoveOne(req.params.id);
  const { deletedCount: DC } = deleted;
  res.msg(DC > 0 ? Notes.DELETED : Notes.NOT_DELETED).Go(deleted);
};

module.exports.removeAll = async (req, res) => {
  const deleted = await PostModel.RemoveAll();
  res.msg(deleted ? Notes.ALL_DELETED : Notes.NONE_DELETED).Go(deleted);
};
