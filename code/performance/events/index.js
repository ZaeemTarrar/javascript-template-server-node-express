let EventEmitter = require("events");
let P = require("./../../utils/helpers/printer");

if (!EventEmitter) throw new Error("Event Emitter could not be Loaded");
let Events = new EventEmitter();

const Listeners = () => {
  Events.on("connection", () => {
    Events.emit("connection-response");
  });
  Events.on("connection-response", () => {
    P.Heading("Event Hooks");
    P.Success("Event Emitter Initialized");
  });
};

Listeners();

module.exports = Events;
