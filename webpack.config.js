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

function extractForProduction(loaders) {
  return ExtractTextPlugin.extract('style', loaders.substr(loaders.indexOf('!')));
}

var cssLoaders = 'style!css?sourceMap!postcss';
var lessLoaders = cssLoaders + '!less?sourceMap';

if (isProduction) {
    cssLoaders = extractForProduction(cssLoaders);
    lessLoaders = extractForProduction(lessLoaders);
  }

module.exports = {
  entry: isProduction ? './src/app.js' : ['webpack/hot/dev-server', './src/app.js'],
  output: {
    path: path.resolve(__dirname, 'public', 'build'),
    pathinfo: isProduction ? false : true,
    publicPath: '/build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  debug: isProduction ? false : true,
  module: {
    preLoaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'eslint-loader' }
    ],
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime' },
      { test: /\.less$/, loader: lessLoaders },
      { test: /\.css$/, loader: cssLoaders },
      { test: /\.(svg|png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=1000&name=images/[name].[hash].[ext]' },
      { test: /(font|fonts)\/.*\.(eot|ttf|woff|svg)$/, loader: 'file?name=font/[name].[ext]' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: isProduction ? false: true,
      __RELEASE__: isProduction ? true : false
    }),
    new webpack.BannerPlugin(pjson.name + ', v' + pjson.version, {entryOnly: true}) // Adds version numter to every output file
  ]
  .concat(!isProduction ? [
    new ExtractTextPlugin('styles/[name].css'),
    new webpack.HotModuleReplacementPlugin() // We have to manually add the Hot Replacement plugin when running from Node
  ] : [])
  .concat(isProduction ? [
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
  ] : []),
  resolve: {
    extensions: ['', '.js', '.jsx', '.less', '.css'],
  },
  postcss: [atImport(), autoprefixer, customMedia(), customProperties(), selector(), minmax(), mqpacker()]

};
