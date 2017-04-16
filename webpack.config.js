const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ExtractSassPlugin = new ExtractTextPlugin({
  // filename: '[name].[contenthash].css',
  filename: '[name].css'
});
const isDevelopment = process.env.NODE_ENV !== 'production';

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
          loader: 'css-loader',
          options: {
            url: false
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('./dist/vendor-manifest.json'),
    }),
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'ENV': JSON.stringify(process.env.NODE_ENV),
    //   },
    // }),
    ExtractSassPlugin
  ].concat(isDevelopment ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
    })
  ])
};

module.exports = config
