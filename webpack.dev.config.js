var path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "example", "main.js"),
  output: {
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        use: ["vue-loader"],
        // include: [path.join(__dirname, "example")],
      },
      {
        test: /\.js$/,
        use: ["babel-loader"],
        // include: [path.join(__dirname, "example")],
      },
      {
        // .css 解析
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"],
        //  include: path.resolve(__dirname, "src"),
      },
      {
        // .less 解析
        test: /\.less$/,
        use: ["style-loader", "css-loader", "postcss-loader", "less-loader"],
        // include: path.resolve(__dirname, "src"),
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "example"),
  },
  plugins: [new VueLoaderPlugin()],
};
