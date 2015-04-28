var page = require('../index.js');

describe('Page', function() {
  it('return default', function() {
    expect(page.toTest()).to.equal('default');
  });

  it('return input', function() {
    expect(page.toTest('same')).to.equal('same');
  });
});
