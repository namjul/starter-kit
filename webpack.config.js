var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer-core');
var atImport = require('postcss-import');
var customMedia = require('postcss-custom-media');
var customProperties = require('postcss-custom-properties');
var selector = require('postcss-custom-selectors');
var minmax = require('postcss-media-minmax');
var mqpacker = require('css-mqpacker');
var pjson = require('./package.json');


module.exports = {
  entry: './src/app.js',
  output: {
    path: path.join(__dirname, '/build'),
    publicPath: '/build/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public',
    hot: true,
    inline: true,
    port: process.env.PORT || 8080
  },
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!less-loader?sourceMap') },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader') },
      { test: /\.useable\.css$/, loader: 'style-loader/useable!css-loader?sourceMap!postcss-loader' },
      { test: /\.gif/, loader: 'url-loader?limit=10000&mimetype=image/gif&name=images/[name].[hash].[ext]' },
      { test: /\.jpg/, loader: 'url-loader?limit=10000&mimetype=image/jpg&name=images/[name].[hash].[ext]' },
      { test: /\.png/, loader: 'url-loader?limit=10000&mimetype=image/png&name=images/[name].[hash].[ext]' },
      { test: /\.svg/, loader: 'url-loader?limit=10000&mimetype=image/svg+xml&name=images/[name].[hash].[ext]' }
    ]
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new ExtractTextPlugin('styles.css'),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pjson.version),
      DEBUG: JSON.stringify(JSON.parse(process.env.DEBUG || 'true')),
      PRODUCTION: JSON.stringify(JSON.parse(process.env.PRODUCTION || 'false'))
    })
  ],
  postcss: [autoprefixer, atImport(), customMedia(), customProperties(), selector(), minmax(), mqpacker()]

};
