const P = require("./../../utils/helpers/printer");
const { LOGS } = require("./../../configs/index");

const RF = (res, code = 200) => {
  return (msg = "", error = false, data = null) => {
    try {
      if (typeof msg != "string") {
        if (typeof error == "string") [msg, error] = [error, msg];
        if (typeof data == "string") [msg, data] = [data, msg];
      }
      if (typeof error != "boolean") {
        if (typeof msg == "boolean") [msg, error] = [error, msg];
        if (typeof data == "boolean") [error, data] = [data, error];
      }
      if (typeof data != "object" && typeof data != "array") {
        if (typeof msg == "object" || typeof msg == "array")
          [msg, data] = [data, msg];
        if (typeof error == "object" || typeof error == "array")
          [error, data] = [data, error];
      }
      return res.status(code).json({ msg, error, data });
    } catch (err) {
      if (LOGS) P.Error("Error", err.message);
    }
  };
};

module.exports = RF;
