const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const helmet = require("helmet");
const { rateLimit } = require("express-rate-limit");
const {
  ALLOW_CORS,
  EXP_ENC_LIM,
  FILE_UPLOAD_LIM,
  COOKIE_AGE,
} = require("./../../configs/meta");
const KEYS = require("./../../configs/keys");

const Init = (app) => {
  // Standard
  app.use(express.urlencoded({ limit: EXP_ENC_LIM + "mb", extended: false }));
  app.use(express.json({ limit: EXP_ENC_LIM + "mb" }));
  app.use(cookieParser());
  app.use(
    session({
      secret: KEYS.SESSION,
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: COOKIE_AGE,
        httpOnly: true,
      },
    })
  );
  app.use(cors({ origin: ALLOW_CORS, credentials: true }));
  app.use(helmet({ contentSecurityPolicy: false, xDownloadOptions: false }));
  // app.use(fileUpload({ limits: { fileSize: FILE_UPLOAD_LIM } }));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: 100,
      standardHeaders: "draft-7",
      legacyHeaders: false,
    })
  );

  // Custom
  app.use(require("./ApiHook"));

  return app;
};

module.exports = Init;
