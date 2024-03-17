const { NOT_FOUND, INTERNAL_SERVER_ERROR } = require("http-status");
const { URL_NOT_FOUND } = require("./../data/static/messages/api/index");

const ApiRouteHandler = (router) => {
  router.get("/", (req, res) => res.msg(URL_NOT_FOUND).Deal(NOT_FOUND));
  router.get("*", (req, res) => res.msg(URL_NOT_FOUND).Deal(NOT_FOUND));
  router.get((req, res) => res.Deal(INTERNAL_SERVER_ERROR));
  return router;
};

module.exports = ApiRouteHandler;
