const P = require("./../utils/helpers/printer");
const { LOGS, LOG_DATA } = require("./../configs/meta");
const { FirstLetterCap: FirstCap } = require("../utils/helpers/string");

const DbActionHooksHandler = (name, scheme, actions = {}) => {
  if (typeof actions == "object" && LOGS) {
    for (const [key, values] of Object.entries(actions)) {
      if (typeof values == "object") {
        for (const v of values) {
          if (v == "post" && LOG_DATA) {
            scheme[v](key, function (docs) {
              P.SchemaAction(name, FirstCap(key), FirstCap(v), docs);
            });
          } else {
            scheme[v](key, function () {
              P.SchemaAction(name, FirstCap(key), FirstCap(v));
            });
          }
        }
      }
    }
  }
};

module.exports = DbActionHooksHandler;
