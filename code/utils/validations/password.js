const REGEX = require("./../../data/static/regex/index");
const { DB } = require("./../../data/static/messages/api/index");

module.exports = {
  validator(v) {
    return true;
  },
  message: (props) => DB.INVALID(props, "Password"),
};
