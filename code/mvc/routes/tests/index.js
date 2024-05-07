const express = require("express");
const ApiRouteHandler = require("../../../handlers/apiRoute");
const zip = require("express-zip");
const fs = require("fs");
const path = require("path");
const imageDataURI = require("image-data-uri");
const { uploadPost } = require("../../../storage/post");
const { Resize } = require("../../../handlers/resizer");

const TestAPIs = express.Router();

TestAPIs.get("/", (req, res) => res.json({ success: true }));

TestAPIs.get("/get-text", (req, res) => {
  res.send("Hello World !");
});

TestAPIs.get("/get-json-data", (req, res) => {
  res.send({
    code: 200,
    message: "success",
    error: false,
    payload: {
      id: 1,
      title: "Harry Potter 1",
      year: "1998",
    },
  });
});

TestAPIs.get("/direct-data-url", async (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "./../../../resources/downloads/images/wall5.jpg")
  );
  const b64 = content.toString("base64");
  const type = "image/jpg";
  const img = `data:${type};base64,${b64}`;
  res.json(img);
});

TestAPIs.get("/get-blob-image", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./../../../resources/downloads/images/wall5.jpg"),
    {},
    (err) => {
      if (err) res.json(null);
    }
  );
});

TestAPIs.get("/get-blob-video", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./../../../resources/downloads/videos/nature1.mp4"),
    {},
    (err) => {
      if (err) res.json(null);
    }
  );
});

// Separation

TestAPIs.post(
  "/testing",
  uploadPost,
  Resize(["snaps", "thumbnails"], "images/post"),
  (req, res) => {
    res.json({ success: true, body: req.body });
  }
);

TestAPIs.get("/stream-test", async (req, res) => {
  let data = [];
  for (let i = 0; i < 100; i++) {
    data.push({ id: i + 1, name: `Zaeem${i}`, age: i * i });
  }
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": String(JSON.stringify(data).length),
    "Transfer-Encoding": "chunked",
  });
  for await (const chunk of JSON.stringify(data)) {
    await new Promise((resolve) => setTimeout(resolve, 1));
    res.write(chunk);
  }
  res.end();
});

TestAPIs.get("/stream-test3", async (req, res) => {
  res.write("I am RDJ");
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.write("I am Robert Downy Junior");
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.write("I am Tony Stark");
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.write("I am Iron Man");
  await new Promise((resolve) => setTimeout(resolve, 500));
  res.end();
});

TestAPIs.get("/stream-test2", async (req, res) => {
  const content = fs.readFileSync(
    path.join(__dirname, "./../../../resources/downloads/images/wall1.png")
  );
  const b64 = content.toString("base64");
  const type = "image/png";
  const img = String(`data:${type};base64,${b64}`);
  console.log("IMG: ", String(`data:${type};base64,${b64}`));
  res.writeHead(200, {
    "Content-Type": "text/plain",
    "Content-Length": img.length,
    "Transfer-Encoding": "chunked",
  });
  for await (const chunk of img) {
    await new Promise((resolve) => setTimeout(resolve, 1));
    res.write(chunk);
  }
  res.end();
});

TestAPIs.get("/get-blob-images", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./../../../resources/downloads/images/wall5.jpg")
  );
});

TestAPIs.get("/downloads", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./../../../resources/downloads/images/wall1.png")
  );
});

TestAPIs.get("/downloads2", (req, res) => {
  try {
    const files = [
      {
        name: "dbs.mp4",
        path: path.join(
          __dirname,
          "./../../../resources/downloads/videos/dbs.mp4"
        ),
      },
      {
        name: "dbz.mp4",
        path: path.join(
          __dirname,
          "./../../../resources/downloads/videos/dbz.mp4"
        ),
      },
      {
        name: "wall1.png",
        path: path.join(
          __dirname,
          "./../../../resources/downloads/images/wall1.png"
        ),
      },
    ];
    res.zip(files);
  } catch (err) {
    console.log("Error: ", err.message);
    res.sendStatus(500);
  }
});

module.exports = ApiRouteHandler(TestAPIs);
