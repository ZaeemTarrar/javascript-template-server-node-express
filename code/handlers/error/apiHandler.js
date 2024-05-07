const { INTERNAL_SERVER_ERROR } = require("http-status");
const P = require("../../utils/helpers/printer");
const { AssertionError } = require("assert");

const HandleError = (res, err) => {
  if (err instanceof AssertionError) {
    P.Error("Assertion Error", err.message);
    return res.msg(err.message).err(true).Go();
  } else {
    P.Error("Error", err.message);
    return res.msg(err.message).Deal(INTERNAL_SERVER_ERROR);
  }
};

const ErrWrap = (api) => {
  return (req, res, next) => {
    try {
      return api(req, res, next).catch((error) => HandleError(res, error));
    } catch (err) {
      return HandleError(res, err);
    }
  };
};

module.exports = ErrWrap;
