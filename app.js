const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const path = require("path");

const buildPath = process.env.BUILD_PATH;
const corsConfigs = require("./configs/cors");
const helmetConfigs = require("./configs/helmet");
const enableGzip =
  process.env.ENABLE_GZIP && JSON.parse(process.env.ENABLE_GZIP);

const app = express();

enableGzip && app.use(compression());
app.use(cors(corsConfigs));
app.use(helmet());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy({ policy: helmetConfigs.referrerPolicy }));
helmetConfigs.enableCsp &&
  app.use(helmet.contentSecurityPolicy(helmetConfigs.csp));

app.use(express.static(path.join(__dirname, buildPath)));

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, buildPath, "index.html"));
});

module.exports = app;
