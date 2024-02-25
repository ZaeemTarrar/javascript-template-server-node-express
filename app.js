const { NOT_FOUND, OK, INTERNAL_SERVER_ERROR } = require("http-status");
const path = require("path");
const http = require("http");
const { address } = require("ip");
const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const { WEB_BASE, PORT } = require("./code/configs/index");
const KEYS = require("./code/configs/keys");
const P = require("./code/utils/helpers/printer");
const app = express();
P.Clear();
P.Welcome();

app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(cookieParser());
app.use(
  session({ secret: KEYS.SESSION, saveUninitialized: false, resave: false })
);
app.use(cors({ origin: WEB_BASE(), credentials: true }));
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));

// app.use(ApiHook.save);
app.use(express.static(__dirname + "/code/shared/"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/code/interface/secure/"));
app.use("/public", express.static(__dirname + "/code/interface/public/"));

// app.use("/api", require("./routes/apis/index"));

app.use("/", require("./code/mvc/routes/views/index"));

// app.get("*", (req, res) => res.RF(NOT_FOUND, Notes.STANDARD.URL_NOT_FOUND));
// app.get((req, res) => res.RF(NOT_FOUND, Notes.STANDARD.URL_NOT_FOUND));
// app.get((req, res) => res.RF(INTERNAL_SERVER_ERROR));

const Launch = async () => {
  try {
    try {
      //   await MongoConnection();
    } catch (err) {}
    try {
      //   await CollectionDropper();
    } catch (err) {
      //   P.Error(DB.DROP_ERR, err.message);
    }
    // await Seeds();
    // await Events.emit("connection");
    const server = http.createServer(app);
    // await Pipes(server);
    server.listen(PORT, async () => {
      P.Heading("EXECUTION");
      P.Link("Thread ProcessId", process.pid);
      P.Link("Listening at", `http://${address()}:${PORT}/`);
    });
  } catch (err2) {
    P.Error("Error", err2.message);
    process.kill();
  }
};

Launch();
