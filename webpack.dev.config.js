var path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'example', 'main.js'),
  output: {
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.vue$/,
        use: ['vue-loader'],
        include: [path.join(__dirname, 'example')],
      },
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [path.join(__dirname, 'example')],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'example'),
  },
  plugins: [new VueLoaderPlugin()],
};
