'use strict';

/**
 * Module dependencies.
 */

require('./index.css');
require('./lol.less');
var bg = require('./images/bg.jpg');
var style = require('./index.useable.css');

setTimeout(function() {
  style.use();

  setTimeout(function() {
    document.querySelector('body').style.backgroundImage = `url(${bg})`;
  }, 3000);
}, 3000);

/**
 * log.
 */

var log = function(value) {
  console.log(value + 'jojojo');
};




module.exports = {
  log: log
};

