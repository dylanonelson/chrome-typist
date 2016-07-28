var path = require('path');

module.exports = {
  entry: {
    'background': './src/background/background',
    'cmdline': './src/cmdline/cmdline',
    'content': './src/content/content',
    'options': './src/options/options'
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
