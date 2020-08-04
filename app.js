const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

const buildPath = process.env.BUILD_PATH;
const expressConfigs = require("./configs/express");
const corsConfigs = require("./configs/cors");
const helmetConfigs = require("./configs/helmet");

const app = express();
app.set("trust proxy", expressConfigs.trustProxy);

expressConfigs.enableGzip && app.use(compression());
app.use(cors(corsConfigs));
app.use(
  helmet({
    referrerPolicy: { policy: helmetConfigs.referrerPolicy },
    contentSecurityPolicy: helmetConfigs.enableCsp && helmetConfigs.csp
  })
);

app.use(express.static(path.join(__dirname, buildPath)));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, buildPath, "index.html"));
});

module.exports = app;
