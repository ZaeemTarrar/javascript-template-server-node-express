const assert = require("assert");
const { v4 } = require("uuid");
const { model, Schema } = require("mongoose");
const Validations = require("./../../utils/validations/index");
const Notes = require("./../../data/static/messages/api/index");
const ActionHooks = require("../../handlers/mongoHooks");
const { CleanObj, MakeRgxFilterArray } = require("../../utils/helpers/object");

const CollectionName = "Post";
let scheme = new Schema(
  {
    _id: { type: String, unique: true, required: true },
    title: { type: String, required: [true, Notes.REQ("Title")] },
    description: { type: String, required: [true, Notes.REQ("Description")] },
    snap: { type: String },
    video: { type: String },
  },
  { versionKey: false, timestamps: true, _id: false }
);

scheme.statics.Count = async () => await Model.countDocuments({});

scheme.statics.FetchAll = async (skip, limit) => {
  if (skip && limit) return await Model.find({}).skip(skip).limit(limit).exec();
  else if (skip) return await Model.find({}).skip(skip).exec();
  else if (limit) return await Model.find({}).limit(limit).exec();
  else return await Model.find({});
};

scheme.statics.FetchOne = async (id) => {
  assert(id);
  return Model.findOne({ _id: id ?? "-1" });
};

scheme.statics.RemoveOne = async (id) => {
  assert(id);
  const result = await Model.deleteOne({ _id: id });
  return { id: id, ...result };
};

scheme.statics.RemoveAll = async () => await Model.deleteMany({});

scheme.statics.Create = async (post, files) => {
  post = await CleanObj(post);
  assert(post.title);
  assert(post.description);
  assert(post.description);
  post._id = v4();
  return await Model.create(post);
};

scheme.statics.Search = async (type = "", filter = {}) => {
  filter = await CleanObj(filter);
  assert(filter, "Couldn't search item. Filters not provided");
  if (type == "and")
    return await Model.findOne({ $and: MakeRgxFilterArray(filter) });
  else if (type == "or")
    return await Model.findOne({ $or: MakeRgxFilterArray(filter) });
  else return await Model.findOne(filter);
};

scheme.statics.Filter = async (type = "", filter, skip, limit) => {
  filter = await CleanObj(filter);
  assert(filter, "Couldn't filter items. Filters not provided");
  if (type == "and" || type == "or") {
    const filter2 = MakeRgxFilterArray(filter);
    if (skip && limit)
      return await Model.find({ [`$${type}`]: filter2 })
        .skip(skip)
        .limit(limit)
        .exec();
    else if (skip)
      return await Model.find({ [`$${type}`]: filter2 })
        .skip(skip)
        .exec();
    else if (limit)
      return await Model.find({ [`$${type}`]: filter2 })
        .limit(limit)
        .exec();
    else return await Model.find({ [`$${type}`]: filter2 });
  } else {
    if (skip && limit)
      return await Model.find(filter).skip(skip).limit(limit).exec();
    else if (skip) return await Model.find(filter).skip(skip).exec();
    else if (limit) return await Model.find(filter).limit(limit).exec();
    else return await Model.find(filter);
  }
};

scheme.statics.FilterPaginate = async (filter, skip = 0, limit = 10) => {
  return await Model.find(filter)
    .skip(skip ?? 0)
    .limit(limit ?? 10)
    .exec();
};

scheme.statics.Update = async (id, changes) => {
  assert(id, "`id` is Required");
  changes = await CleanObj(post);
  return await Model.findByIdAndUpdate(id, changes, {
    new: true,
    useFindAndModify: false,
  });
};

ActionHooks(CollectionName, scheme, {
  find: ["pre", "post"],
  findOne: ["pre", "post"],
  save: ["pre", "post"],
  validate: ["pre", "post"],
  remove: ["pre", "post"],
  update: ["pre", "post"],
  delete: ["pre", "post"],
  deleteOne: ["pre", "post"],
  deleteMany: ["pre", "post"],
  findByIdAndUpdate: ["pre", "post"],
  insertMany: ["pre", "post"],
});

const Model = model(CollectionName, scheme);
module.exports = Model;
