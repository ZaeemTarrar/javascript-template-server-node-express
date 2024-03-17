const RequestFormatter = (res) => {
  res._status = 200;
  res._message = "";
  res._error = false;
  res._data = null;

  res.reset = function () {
    this._code = 200;
    this._message = "";
    this._error = false;
    this._data = null;
    return this;
  }.bind(res);

  res.sts = function (arg) {
    this._status = isNaN(arg) ? 200 : arg;
    return this;
  }.bind(res);

  res.msg = function (arg) {
    this._message = typeof arg == "string" ? arg : "";
    return this;
  }.bind(res);

  res.err = function (arg) {
    this._error = typeof arg == "boolean" ? arg : false;
    return this;
  }.bind(res);

  res.pyd = function (arg) {
    this._data = typeof arg == "object" || typeof arg == "array" ? arg : null;
    return this;
  }.bind(res);

  res.Go = function (data1 = null) {
    if (data1) this.pyd(data1);
    this.status(this._status).json({
      message: this._message,
      error: this._error,
      payload: this._data,
    });
    this.reset();
    this.end();
    return;
  }.bind(res);

  res.Deal = function (code) {
    this.status(code).json({
      message: this._message,
      error: true,
      payload: this._data,
    });
    this.reset();
    this.end();
    return;
  }.bind(res);

  return res;
};

module.exports = RequestFormatter;
