const REGEX = require("./../../data/static/regex/index");
const { DB } = require("./../../data/static/messages/api/index");

module.exports = {
  validator(v) {
    return v.match(REGEX.email);
  },
  message: (props) => DB.INVALID(props, "Email Address"),
};
