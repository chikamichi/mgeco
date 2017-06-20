const webpack = require('webpack');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const LoadGalleryVendorsDll = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./dist/gallery_vendors.manifest.json'),
});

const CompileGallery = new HtmlWebpackPlugin({
  title: 'MG éco-construction',
  filename: 'gallery.html',
  template: 'src/html/gallery.gen.js',
  inject: false
});

const CopyGalleryToWebsite = new CopyWebpackPlugin([
  {
    context: 'dist/',
    from: 'gallery.html',
    to: '../../website/themes/mgeco/layouts/galerie/single.html'
  }, {
    context: 'dist/',
    from: '*.js',
    to: '../../website/themes/mgeco/static/js/'
  }
], {
  copyUnmodified: true
})

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    gallery: './src/js/gallery.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]'
    // publicPath: ''
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'file-loader'
      // loader: 'url-loader',
      // options: {
      //   limit: 10000
      // }
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.pug$/,
      loader: 'pug-loader'
    }, {
      test: /\.html$/,
      loader: 'html-loader',
      options: {
        attrs: false
      }
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      _: 'lodash'
    }),
    LoadGalleryVendorsDll,
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'ENV': JSON.stringify(process.env.NODE_ENV),
    //   },
    // }),
    CompileGallery,
    CopyGalleryToWebsite
  ].concat(isDevelopment ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
    })
  ])
};

module.exports = config
