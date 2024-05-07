const { performance } = require("node:perf_hooks");
const v8 = require("node:v8");
const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("http-status");
const P = require("./../../utils/helpers/printer");
const RequestFormatter = require("../../utils/generators/reqFormat");
const META = require("./../../configs/meta");
const { Diff } = require("../../utils/helpers/date");
const { Form } = require("../../utils/helpers/url");
const { IP, PORT } = META;

module.exports = (req, res, next) => {
  const ToMB = 1000; // KB
  let startTime = new Date();
  let t1;
  let h1;
  let heapUsed;
  let heapTotal;
  let t2;
  let h2;
  let perfDiff;
  let heapUsed2;
  let heapTotal2;
  let heapUsedDiff;
  let heapTotalDiff;

  res.startTracking = () => {
    t1 = performance.now();
    h1 = process.memoryUsage();
    heapUsed = (+h1.heapUsed / ToMB).toFixed(3);
    heapTotal = (+h1.heapTotal / ToMB).toFixed(3);
  };

  res.stopTracking = () => {
    t2 = performance.now();
    h2 = process.memoryUsage();
    perfDiff = Number((+t2 - +t1) / 1000).toFixed(3);
    heapUsed2 = (+h2.heapUsed / ToMB).toFixed(3);
    heapTotal2 = (+h2.heapTotal / ToMB).toFixed(3);
    heapUsedDiff = Number(heapUsed2 - heapUsed).toFixed(3);
    heapTotalDiff = Number(heapTotal2 - heapTotal).toFixed(3);
  };

  res = RequestFormatter(res);

  res.on("finish", function () {});
  res.on("close", function () {});
  req.on("end", function () {});
  req.on("close", function () {
    let { query, method, body, params, protocol, originalUrl } = req;
    let timeDiff = Diff(new Date(), startTime);
    let urlPath = Form(protocol, IP, PORT, originalUrl);
    P.ApiReport(
      process.pid,
      method,
      timeDiff,
      urlPath,
      query,
      params,
      body,
      perfDiff || (0.0).toFixed(3),
      heapUsed || (0.0).toFixed(3),
      heapTotal || (0.0).toFixed(3),
      heapUsed2 || (0.0).toFixed(3),
      heapTotal2 || (0.0).toFixed(3),
      heapUsedDiff || (0.0).toFixed(3),
      heapTotalDiff || (0.0).toFixed(3)
    );
  });

  next();
};
