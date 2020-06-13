const yaml = require("js-yaml");
const fs = require("fs");

const csp = yaml.safeLoad(fs.readFileSync("./csp.yml", "utf8"));
csp.directives.fontSrc = process.env.CSP_FONT_SRC || "'self'";
csp.directives.scriptSrc = process.env.CSP_SCRIPT_SRC || "'self'";
csp.directives.connectSrc = process.env.CSP_CONNECT_SRC || "'self'";

module.exports = {
  enableCsp: process.env.ENABLE_CSP && Boolean(process.env.ENABLE_CSP),
  referrerPolicy: process.env.REFERRER_POLICY || "same-origin",
  csp
};
