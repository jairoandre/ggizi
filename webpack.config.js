var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: ['webpack-dev-server/client?http://localhost:3000',
          'webpack/hot/only-dev-server',
          './src/main.js'],
  output: {
    path: path.join(__dirname, '/dist'),
    filename: "bundle.js",
    publicPath: '/static/'
  },
  module: {
    loaders: [{
      test: /\.js?$/,
      loaders: ['react-hot', 'babel'],
      exclude: /node_modules/,
    }]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};