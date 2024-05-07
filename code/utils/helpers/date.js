module.exports.Diff = (d2, d1) => {
  return (+d2.getTime() - +d1.getTime()) / 1000.0;
};
