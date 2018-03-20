const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

const copyPhotoswipeAssets = new CopyWebpackPlugin([
  {
    from: 'node_modules/photoswipe/dist/photoswipe.css',
    to: '../../website/themes/mgeco/static/css/photoswipe/'
  }, {
    context: './node_modules/photoswipe/dist/',
    from: 'default-skin/*',
    to: '../../website/themes/mgeco/static/css/photoswipe/'
  }
], {
  copyUnmodified: true
})

module.exports = {
  entry: {
    'gallery_vendors': [
      './src/gallery/vendors.js'
    ],
    'homepage_carousel_vendors': [
      './src/homepage_carousel/vendors.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]_[hash]'
  },
  plugins: [
    new webpack.DllPlugin({
      path: './dist/[name].manifest.json',
      name: '[name]_[hash]',
    }),
    copyPhotoswipeAssets
  ].concat(isDevelopment ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
    }),
  ]),
};
