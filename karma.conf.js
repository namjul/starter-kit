var webpackConfig = require('./webpack.config.js');

var karmaConfig = {

    frameworks: ['mocha', 'chai'],

    browsers: ['PhantomJS'],

    reporters: ['mocha'],

    files: [
      './src/**/__tests__/*.js'
    ],

    preprocessors: {
      './src/**/__tests__/*.js': ['webpack']
    },

    webpackMiddleware: {
      noInfo: true
    },

    plugins: [
      'karma-webpack',
      'karma-mocha',
      'karma-chai',
      'karma-phantomjs-launcher',
      'karma-mocha-reporter'
    ]
};

karmaConfig.webpack = webpackConfig;

module.exports = function(config) {
  config.set(karmaConfig);
};
