const trustProxy = ["true", "false"].includes(process.env.EXPRESS_TRUST_PROXY)
  ? JSON.parse(process.env.EXPRESS_TRUST_PROXY)
  : process.env.EXPRESS_TRUST_PROXY;

module.exports = {
  enableGzip:
    process.env.EXPRESS_ENABLE_GZIP &&
    JSON.parse(process.env.EXPRESS_ENABLE_GZIP),
  trustProxy
};
