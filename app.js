const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

const buildPath = process.env.BUILD_PATH;
const corsConfigs = require("./configs/cors");

const app = express();

app.use(compression());
app.use(cors(corsConfigs));
app.use(helmet());

app.use(express.static(path.join(__dirname, buildPath)));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, buildPath, "index.html"));
});

module.exports = app;
