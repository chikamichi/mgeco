const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ExtractSassPlugin = new ExtractTextPlugin({
  // filename: '[name].[contenthash].css',
  filename: '[name].css'
});

const config = {
  entry: {
    main: './src/js/index.js',
    styles: './src/css/main.scss'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractSassPlugin.extract({
        use: [{
          loader: 'css-loader'
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    ExtractSassPlugin
  ]
};

module.exports = config
