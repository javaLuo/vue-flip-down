const path = require("path");

module.exports = {
  css: {
    extract: process.env.NODE_ENV === "production" ? false : true,
  },
  outputDir: process.env.NODE_ENV === "production" ? path.resolve(__dirname, "dist") : path.resolve(__dirname, "example-dist"),
  // publicPath: process.env.NODE_ENV === "production" ? "/" : "/example/",
  // configureWebpack: config => {
  //   return {};
  // },
};
