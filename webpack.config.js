var path = require('path');

module.exports = {
  entry: {
    'background': './src/background/background',
    'content': './src/content/content',
    'cmdline': './src/cmdline/cmdline'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      loader: 'dom?tag=main!html'
    }, {
      test: /\.ejs$/,
      exclude: /node_modules/,
      loader: 'ejs-loader'
    }]
  }
}
