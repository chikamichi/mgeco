const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// const extractCSS = new ExtractTextPlugin('vendor.css');
// const ExtractSassPlugin = new ExtractTextPlugin({
//   filename: '[name].css'
// });
const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  resolve: {
    extensions: ['.js'],
    // modules: ['node_modules']
  },
  // module: {
  //   rules: [
  //     { test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
  //     { test: /\.s?css$/i, loader: extractCSS.extract(['css-loader?minimize', 'sass-loader']) },
  //     { test: /\.json$/, loader: 'json-loader' },
  //   ],
  // },
  // module: {
  //   rules: [{
  //     test: /\.scss$/,
  //     use: ExtractSassPlugin.extract({
  //       use: [{
  //         loader: 'css-loader'
  //       }, {
  //         loader: 'sass-loader'
  //       }]
  //     })
  //   }]
  // },
  entry: {
    vendor: [
      path.join(__dirname, 'src', 'js', 'vendors.js')
    ]
  },
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    library: '[name]_[hash]',
  },
  plugins: [
    // extractCSS,
    // ExtractSassPlugin,
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dist', '[name]-manifest.json'),
      name: '[name]_[hash]',
    })
  ].concat(isDevelopment ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
    }),
  ]),
};
