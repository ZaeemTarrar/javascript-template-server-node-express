const Upload = require("../storage");

const MultiUpload = (fileData = []) => {
  return function (req, res, next) {
    for (const val of fileData) {
      Upload(
        val[1] || "",
        val[2] || 1,
        val[4] || ["jpg", "png", "jpeg"]
      ).fields([{ name: val[0], maxCount: val[3] || 1 }])(req, res, next);
    }
    next();
  };
};

module.exports = MultiUpload;
