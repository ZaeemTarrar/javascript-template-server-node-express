const { model, Schema } = require("mongoose");
const Validations = require("./../../utils/validations/index");
const Notes = require("./../../data/static/messages/api/index");
const P = require("./../../utils/helpers/printer");
const ActionHooks = require("../../handlers/mongoHooks");

const CollectionName = "User";
const scheme = new Schema(
  {
    _id: { type: String },
    userName: {
      type: String,
      index: true,
      unique: true,
      required: [true, Notes.REQ("Username")],
    },
    mobileNumber: {
      type: String,
      index: true,
      unique: true,
      required: [true, Notes.REQ("Mobile Number")],
      validate: Validations.Phone,
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: [true, Notes.REQ("Email")],
      validate: Validations.Email,
    },
    password: {
      type: String,
      index: true,
      unique: true,
      required: [true, Notes.REQ("Password")],
      validate: Validations.Password,
    },
  },
  { versionKey: false, timestamps: true, _id: false }
);

scheme.pre("save", function (self, next) {
  P.SchemaAction(CollectionName, "Save", "Pre");
});

ActionHooks(CollectionName, scheme, {
  find: ["pre", "post"],
  findOne: ["pre", "post"],
  save: ["post"],
  validate: ["pre", "post"],
  remove: ["pre", "post"],
  update: ["pre", "post"],
  delete: ["pre", "post"],
  deleteOne: ["pre", "post"],
  deleteMany: ["pre", "post"],
  findByIdAndUpdate: ["pre", "post"],
  insertMany: ["pre", "post"],
});

const Collection = model(CollectionName, scheme);
module.exports = Collection;
