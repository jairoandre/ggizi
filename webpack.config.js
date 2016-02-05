var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: __dirname + "/src/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },
  module: {
    loaders: [
    {
      test: /\.js?$/,
      loader: 'react-hot!babel',
      exclude: /node_modules/,
    }]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true  
  }
};