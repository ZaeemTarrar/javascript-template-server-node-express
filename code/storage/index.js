const multer = require("multer");
const path = require("path");

const PATH = (...p) =>
  path.join(__dirname, "../../code/resources/uploads", ...p);

const Upload = (
  filePath = "",
  size = 1,
  allowed = ["jpg", "png", "gif", "ico", "jpeg", "webp"],
  noOfFields,
  noOfFiles
) => {
  const destination = function (req, file, cb) {
    cb(null, PATH(filePath, file.fieldname));
  };

  const filename = function (req, file, cb) {
    const nameArr = file.originalname.split(".");
    const Ext = nameArr[nameArr.length - 1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "." + Ext);
  };

  const storage = multer.memoryStorage({
    destination,
    filename,
  });

  let limits = {
    fileSize: +size * 1000000,
    fieldNameSize: 1000,
  };
  if (noOfFields) limits.fields = noOfFields;
  if (noOfFiles) limits.files = noOfFiles;

  const fileFilter = function (req, file, cb) {
    const nameArr = file.originalname.split(".");
    if (!allowed.includes(nameArr[nameArr.length - 1])) {
      return cb(null, false, new Error("File Type Error"));
    } else cb(null, true);
  };
  return multer({ storage, limits, fileFilter });
};

module.exports.PATH = PATH;
module.exports.Upload = Upload;
