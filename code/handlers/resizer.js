const MulterSharpResizer = require("multer-sharp-resizer");
const { PATH } = require("../storage");

module.exports.Resize = (
  name,
  uplPath = "images",
  sizes = [
    { path: "original", width: null, height: null },
    { path: "standard", width: 600, height: 400 },
    { path: "small", width: 120, height: 80 },
  ],
  sharpOptions = {
    fit: "cover",
    background: { r: 255, g: 255, b: 255 },
  }
) => {
  let filename = {};
  if (!Array.isArray(name)) throw new Error("Resizer requires an Array");
  else {
    for (const x of name) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      filename[x] = x + uniqueSuffix + "";
    }
  }
  return async (req, res, next) => {
    try {
      const resizeObj = new MulterSharpResizer(
        req,
        filename,
        sizes,
        PATH(uplPath),
        PATH(uplPath),
        sharpOptions
      );
      await resizeObj.resize();
      const getUploadedData = resizeObj.getData();
      if (Array.isArray(name)) {
        for (let v of name) {
          req.body[v] = getUploadedData[v];
        }
      } else if (typeof name == "string") {
        req.body[name] = getUploadedData[name];
      }
      next();
    } catch (err) {
      console.log("ResizingError: ", err);
      throw new Error("Could not Resize the Uploaded Files");
    }
  };
};
