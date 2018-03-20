const path = require('path');
const WebpackShellPlugin = require('webpack-shell-plugin');

const generateImages = new WebpackShellPlugin({
  onBuildEnd: [
    'npx babel-node src/images/generator.js',
    'rm dist/images.js' // this build need not generating a JS asset
  ]
})

const config = {
  entry: {
    images: './src/images/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: '[name]'
  },
  plugins: [
    generateImages
  ]
};

module.exports = config
