const P = require("./../../utils/helpers/printer");
const Socket = require("socket.io");

const Pipes = async (server) => {
  const IO = Socket(server, { cors: { origin: "*" } });
  IO.on("connection", (socket) => {
    P.Heading("Web Socket");
    P.Link("New Socket Connected", socket.id);

    socket.on("test", (data) => {
      socket.emit("test-response", { id: socket.id, connected: true });
      P.Data("Socket Test Response", data);
    });

    socket.on("disconnect", () => {
      P.Link("Socket Disconnected", socket.id);
    });
  });
  return IO;
};

module.exports = Pipes;
