var path = require('path');

module.exports = {
  entry: {
    'background': './src/background/background',
    'cmdline': './src/cmdline/cmdline.jsx',
    'content': './src/content/content',
    'options': './src/options/options.jsx'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.ejs$/,
      exclude: /node_modules/,
      loader: 'ejs-loader'
    }],
    preLoaders: [
      {
        test: /\.jsx?$/,
        loader: 'eslint?{fix:true}',
        include: /src/,
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  resolve: {
    root: path.resolve('./src')
  }
}
