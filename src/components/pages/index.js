'use strict';

/**
 * Module dependencies.
 */

import './index.css';
import './lol.less';
import bg from './images/bg.jpg';
import style from './index.useable.css';

setTimeout(function() {
  style.use();

  setTimeout(function() {
    document.querySelector('body').style.backgroundImage = `url(${bg})`;
  }, 3000);
}, 3000);

/**
 * log.
 *
 * TODO: something to do
 */

var log = function(value) {
  console.log(value + 'jojojo');
};




module.exports = {
  toTest: function(input='default') {
    return input;
  },
  log: log
};

