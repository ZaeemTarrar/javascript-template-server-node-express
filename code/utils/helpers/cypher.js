const { hash, genSaltSync, compare } = require("bcrypt");
const {
  ENCRYPT: { SALT },
} = require("../../configs/keys");

const Encrypt = async (pwd) => await hash(pwd, await genSaltSync(SALT));
const Validate = async (strPwd, encPwd) => await compare(strPwd, encPwd);

module.exports = {
  Bcrypt: { Encrypt, Validate },
};
