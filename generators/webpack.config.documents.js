const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin');

const LoadGalleryVendorsDll = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./dist/gallery_vendors.manifest.json'),
});

const LoadHomepageCarouselVendorsDll = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./dist/homepage_carousel_vendors.manifest.json'),
});

const CompileGallery = new HtmlWebpackPlugin({
  title: 'MG éco-construction',
  filename: 'gallery.html',
  // .js files go through babel-loader, as specified below within the config;
  // generator.js is expected to output an HTML template then.
  template: 'src/gallery/generator.js',
  inject: false
});

const CompileHomepageCarousel = new HtmlWebpackPlugin({
  filename: 'homepage_carousel.html',
  template: 'src/homepage_carousel/generator.js',
  inject: false
});

const CopyAssetsToWebsite = new FileManagerPlugin({
  onEnd: {
    copy: [
      {
        source: './dist/gallery.html',
        destination: '../website/themes/mgeco/layouts/galerie/single.html'
      }, {
        source: './dist/homepage_carousel.html',
        destination: '../website/themes/mgeco/layouts/partials/homepage_carousel.html'
      },
      {
        source: './dist/*.js',
        destination: '../website/themes/mgeco/static/js/'
      }
    ]
  }
})

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    'gallery': './src/gallery/index.js',
    'homepage_carousel': './src/homepage_carousel/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [{
      test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      loader: 'file-loader'
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
    LoadHomepageCarouselVendorsDll,
    CompileGallery,
    CompileHomepageCarousel,
    CopyAssetsToWebsite
  ].concat(isDevelopment ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
    })
  ])
};

module.exports = config
