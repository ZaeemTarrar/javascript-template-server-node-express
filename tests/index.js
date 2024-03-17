const fs = require("fs/promises");
const MultiUpload = require("../code/handlers/uploader");

const WriteJsonData = async () => {
  let data = [];
  let entries = 20;
  for (let i = 1; i < entries; i++) {
    data.push({
      _id: i + "",
      title: `Zaeem${i}`,
      description: "lorem ipsum",
      snap: "",
      video: "",
    });
  }
  await fs.writeFile(
    "./code/data/json/post.json",
    JSON.stringify({ data: data })
  );
  console.log("Done !");
};

let Res = {
  status: 200,
  message: "",
  error: false,
  data: null,
};

const RequestFormatter = function (res) {
  res.status = 200;
  res.message = "";
  res.error = false;
  res.data = null;

  res.reset = function () {
    this.code = 200;
    this.message = "";
    this.error = false;
    this.data = null;
    return this;
  }.bind(res);

  res.code = function (arg) {
    this.status = isNaN(arg) ? 200 : arg;
    return this;
  }.bind(res);

  res.msg = function (arg) {
    this.message = typeof arg == "string" ? arg : "";
    return this;
  }.bind(res);

  res.err = function (arg) {
    this.error = typeof arg == "boolean" ? arg : false;
    return this;
  }.bind(res);

  res.pyd = function (arg) {
    this.data = typeof arg == "object" || typeof arg == "array" ? arg : null;
    return this;
  }.bind(res);

  res.Go = function () {
    console.log(
      "\nResult: ",
      {
        code: this.status,
        message: this.message,
        error: this.error,
        payload: this.data,
      },
      "\n"
    );
    this.reset();
    return;
  }.bind(res);

  return res;
};

const Test = async () => {
  // Code
  const Data = [
    { field: { name: "snaps", maxCount: 1 }, path: "posts/snaps" },
    { field: { name: "thumbnails", maxCount: 3 }, path: "posts/thumbnails" },
  ];
  MultiUpload(Data);
};

Test();
