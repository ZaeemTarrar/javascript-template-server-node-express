const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("http-status");
const P = require("./../../utils/helpers/printer");
const RequestFormatter = require("../../utils/generators/reqFormat");
const META = require("./../../configs/meta");
const { Diff } = require("../../utils/helpers/date");
const { Form } = require("../../utils/helpers/url");
const { IP, PORT } = META;

module.exports = (req, res, next) => {
  let startTime = new Date();
  res = RequestFormatter(res);

  res.on("finish", function () {});
  res.on("close", function () {});
  req.on("end", function () {});
  req.on("close", function () {
    let { query, method, body, params, protocol, originalUrl } = req;
    let timeDiff = Diff(new Date(), startTime);
    let urlPath = Form(protocol, IP, PORT, originalUrl);
    P.ApiReport(method, timeDiff, urlPath, query, params, body);
  });

  next();
};
