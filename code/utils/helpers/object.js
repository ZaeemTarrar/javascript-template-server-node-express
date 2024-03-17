const EscapeRegexp = require("escape-string-regexp-node");

module.exports.CleanObj = async (obj) => {
  Object.keys(obj).forEach((key) =>
    obj[key] == undefined || obj[key] == null ? delete obj[key] : undefined
  );
  if (Object.keys(obj).length == 0) return undefined;
  else return obj;
};

module.exports.MakeFilterArray = (filter) => {
  let filterArr = [];
  for (const [key, value] of Object.entries(filter)) {
    filterArr.push({ [key]: value });
  }
  return filterArr;
};

module.exports.MakeRgxFilterArray = (filter) => {
  let filterArr = [];
  for (const [key, value] of Object.entries(filter)) {
    filterArr.push({ [key]: { $regex: EscapeRegexp(value) } });
  }
  console.log("Data: ", filterArr);
  return filterArr;
};
