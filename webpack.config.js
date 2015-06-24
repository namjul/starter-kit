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
var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    pathinfo: isProduction ? false : true,
    publicPath: '/build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  debug: isProduction ? false : true,
  module: {
    loaders: [
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!less-loader?sourceMap') },
      { test: /\.css$/, exclude: /\.useable\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!postcss-loader') },
      { test: /\.useable\.css$/, loader: 'style-loader/useable!css-loader?sourceMap!postcss-loader' },
      { test: /\.(svg|png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=1000&name=images/[name].[hash].[ext]' },
      { test: /(font|fonts)\/.*\.(eot|ttf|woff|svg)$/, loader: 'file?name=font/[name].[ext]' }
    ]
  },

  plugins: [
    new ExtractTextPlugin('styles/[name].css'),
    new webpack.DefinePlugin({
      VERSION: JSON.stringify(pjson.version),
      DEBUG: isProduction ? false: true,
      PRODUCTION: isProduction ? true : false
    }),
    new webpack.BannerPlugin(pjson.name + ', v' + pjson.version, {entryOnly: true}) // Adds version numter to every output file
  ]
  .concat(!isProduction ? [
    new webpack.HotModuleReplacementPlugin() // We have to manually add the Hot Replacement plugin when running from Node
  ] : [])
  .concat(isProduction ? [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ] : []),
  resolve: {
    extensions: ['', '.js', '.less']
  },
  postcss: [atImport(), autoprefixer, customMedia(), customProperties(), selector(), minmax(), mqpacker()]

};
