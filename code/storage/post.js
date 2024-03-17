const { Upload } = require("./index");

module.exports.uploadPost = Upload("images/post", 10, [
  "jpeg",
  "webp",
  "avif",
]).fields([
  { name: "snaps", maxCount: 1 },
  { name: "thumbnails", maxCount: 3 },
]);
