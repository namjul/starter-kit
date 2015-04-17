var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var atImport = require('postcss-import');
var customMedia = require('postcss-custom-media');
var customProperties = require('postcss-custom-properties');
var selector = require('postcss-custom-selectors');
var minmax = require('postcss-media-minmax');
var mqpacker = require('css-mqpacker');


module.exports = {
  // webpack config
  entry: './src/app.js',
  output: {
    path: __dirname + '/build',
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!less-loader?sourceMap') },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader') },
      { test: /\.useable\.css$/, loader: 'style-loader/useable!css-loader?sourceMap!postcss-loader' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192&name=images/[name].[hash].[ext]' }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ],
  postcss: [autoprefixer, atImport(), customMedia(), customProperties(), selector(), minmax(), mqpacker()]

};
