if(DEBUG) {
  console.log('Running App version ' + VERSION);
}




/**
 * Module dependencies.
 */

require('es5-shim');
require('./styles/index.js');
var page = require('./components/example/index.js');

page.log('Hello World');


