import 'es5-shim';
import app from '../index.js';

describe('App', function() {
  it('return String', function() {
    expect(app()).to.equal('AppClass');
  });
});
