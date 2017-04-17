const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const LoadVendorDll = new webpack.DllReferencePlugin({
  context: __dirname,
  manifest: require('./dist/vendor-manifest.json'),
});
const CompileSass = new ExtractTextPlugin({
  // filename: '[name].[contenthash].css',
  filename: '[name].css'
});
const CompileHtml = new HtmlWebpackPlugin({
  title: 'MG éco-construction',
  template: 'src/html/index.ejs',
  inject: 'body'
});

const isDevelopment = process.env.NODE_ENV !== 'production';

const config = {
  entry: {
    main: './src/js/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist'
  },
  resolve: {
    extensions: ['.js', '.scss']
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: CompileSass.extract({
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
    LoadVendorDll,
    // new webpack.DefinePlugin({
    //   'process.env': {
    //     'ENV': JSON.stringify(process.env.NODE_ENV),
    //   },
    // }),
    CompileSass,
    CompileHtml
  ].concat(isDevelopment ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
    })
  ])
};

module.exports = config
