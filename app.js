const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

const buildPath = process.env.BUILD_PATH;
const spa =
  process.env.SINGLE_PAGE_APP && JSON.parse(process.env.SINGLE_PAGE_APP);
const corsConfigs = require("./configs/cors");

const app = express();

app.use(logger("dev"));
app.use(compression());
app.use(cors(corsConfigs));
app.use(helmet());

app.use(express.static(path.join(__dirname, buildPath)));

if (spa) {
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, buildPath, "index.html"));
  });
}

module.exports = app;
