const P = require("../../utils/helpers/printer");
const META = require("../../configs/meta");
const { TRACK_ERR } = META;

const Handler = async (codeContainerCallBack) => {
  process.on("unhandledRejection", (err, data) => {
    if (TRACK_ERR) P.Error("RejectionErrorExtended", err);
    else if (err.hasOwnProperty("message"))
      P.Error("RejectionError", err.message);
  });

  process.on("uncaughtException", (err, origin) => {
    if (TRACK_ERR) P.Error("UnknownErrorExtended", err);
    else if (err.hasOwnProperty("message"))
      P.Error("UnknownError", err.message);
  });

  try {
    await codeContainerCallBack();
  } catch (err) {
    if (TRACK_ERR) P.Error("AppErrorExtended", err);
    else if (err.hasOwnProperty("message")) P.Error("AppError", err.message);
  }
};

module.exports = Handler;
