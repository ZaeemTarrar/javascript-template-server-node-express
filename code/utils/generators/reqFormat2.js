const RF = (res) => {
  return (...args) => {
    try {
      let code = 200;
      let msg = "";
      let err = false;
      let data = null;
      for (let i = 0; i < args.length; i++) {
        if (typeof args[i] == "number") code = args[i];
        else if (typeof args[i] == "string") msg = args[i];
        else if (typeof args[i] == "boolean") err = args[i];
        else if (typeof args[i] == "object" || typeof args[i] == "array")
          data = args[i];
      }
      res.status(code).json({ message: msg, error: err, data });
      return res.end();
    } catch (error) {
      throw new Error(error);
    }
  };
};

module.exports = RF;
