const {
  gray,
  bold,
  blue,
  magenta,
  red,
  yellow,
  green,
  cyan,
  rainbow,
} = require("colors");
const { LOGS } = require("../../configs/meta");

module.exports = {
  Clear: () => LOGS && console.clear(),
  Welcome: () => {
    if (LOGS) {
      console.log(bold(rainbow("\n++++++++++++++++++++++++++")));
      console.log(bold(green("++++  Node Js Server  ++++")));
      console.log(bold(rainbow("++++++++++++++++++++++++++")));
    }
  },
  Line: () => LOGS && console.log(""),
  _Link: (title, link) =>
    LOGS && console.log(bold(gray(title + ": ")), bold(blue(link))),
  Link: (title, link) =>
    LOGS && console.log(bold(gray("\n" + title + ": ")), bold(blue(link))),
  _Heading: (title) => LOGS && console.log(bold(magenta("[" + title + "]"))),
  Heading: (title) => LOGS && console.log(bold(magenta("\n[" + title + "]"))),
  _Success: (title) =>
    LOGS && console.log(bold(gray("->")), bold(green(title))),
  Success: (title) =>
    LOGS && console.log(bold(gray("\n->")), bold(green(title))),
  _Error: (title, error) =>
    LOGS && console.log(bold(red(title + ": ")), bold(gray(error))),
  Error: (title, error) =>
    LOGS && console.log(bold(red("\n" + title + ": ")), bold(gray(error))),
  _Data: (title, data) =>
    LOGS && console.log(bold(gray(title)), bold(yellow(data))),
  Data: (title, data) =>
    LOGS && console.log(bold(gray("\n" + title)), bold(yellow(data))),
  SchemaAction: (name, action, stage, data = undefined) =>
    LOGS &&
    console.log(
      bold(magenta(`\n[DbSchemaAction]`)),
      bold(blue(`[${name}]`)),
      bold(red(`[${action}]`)),
      bold(yellow(`[${stage}]`)),
      data ? bold(gray(`[${JSON.stringify(data, null, 3)}]`)) : ""
    ),
  ApiReport: (m, t, u, q, p, b) => {
    if (LOGS) {
      let D = new Date();
      let timeUrl =
        `${D.getDate()}/${D.getMonth()}/${D.getFullYear()} ` +
        `${D.getHours()}:${D.getMinutes()}:${D.getSeconds()}`;
      console.log(
        bold(gray(`\n[${timeUrl}]`)),
        bold(blue("\n[API LOG]")),
        bold(gray("->")),
        bold(red(`[${m}]`)),
        bold(cyan(`[${t}s]`)),
        bold(green(`[${u}]`)),
        bold(gray(`[Queries]:`)),
        bold(yellow(q)),
        bold(gray(`[Params]:`)),
        bold(yellow(p)),
        bold(gray(`[Body]:`)),
        bold(yellow(b))
      );
    }
  },
};
