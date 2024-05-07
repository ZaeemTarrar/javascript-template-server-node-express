module.exports.Form = (protocol, ip, port, url) => {
  return `${protocol}://${ip}:${port}${url}`;
};
