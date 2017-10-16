// Userland modules
var chai = require('chai');

// Local modules
var addon = require('../');


// Local variales
var expect = chai.expect;



describe('addon', function() {

  it('should have all expected keys', function() {
    expect(addon).to.contain.all.keys(['add']);
  });


  describe('.add', function() {

    it('should be a function', function() {
      expect(addon.add).to.be.a('function');
    });

    it('should expect 2 parameters', function() {
      expect(() => { addon.add(); }).to.throw(TypeError, 'Invalid argument count');
      expect(() => { addon.add(1); }).to.throw(TypeError, 'Invalid argument count');
      expect(() => { addon.add(1, 2, 3); }).to.throw(TypeError, 'Invalid argument count');
      expect(() => { addon.add(1, 2, 3, 4); }).to.throw(TypeError, 'Invalid argument count');
    });

    it('should expect valid parameters', function() {
      // Invalid param 1
      expect(() => { addon.add('a', 2); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(false, 2); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(true, 2); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add({}, 2); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add([], 2); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add([1], 2); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(() => { 1 }, 2); }).to.throw(TypeError, 'Invalid argument types');

      // Invalid param 2
      expect(() => { addon.add(1, 'b'); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(1, false); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(1, true); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(1, {}); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(1, []); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(1, [2]); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(1, () => { 2 }); }).to.throw(TypeError, 'Invalid argument types');

      // Invalid params 1 + 2
      expect(() => { addon.add('a', 'b'); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(false, false); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(true, true); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add({}, {}); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add([], []); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add([1], [2]); }).to.throw(TypeError, 'Invalid argument types');
      expect(() => { addon.add(() => { 1 }, () => { 2 }); }).to.throw(TypeError, 'Invalid argument types');
    });

    it('should add numbers together', function() {
      // zeroes
      expect(addon.add(0, 0)).to.equal(0);

      // zeroes + positives
      expect(addon.add(0, 1)).to.equal(1);
      expect(addon.add(1, 0)).to.equal(1);

      // zeroes + negatives
      expect(addon.add(0, -1)).to.equal(-1);
      expect(addon.add(-1, 0)).to.equal(-1);

      // positives
      expect(addon.add(2, 3)).to.equal(5);
      expect(addon.add(3, 2)).to.equal(5);

      // negatives
      expect(addon.add(-2, -3)).to.equal(-5);
      expect(addon.add(-3, -2)).to.equal(-5);

      // postives + negatives
      expect(addon.add(2, -3)).to.equal(-1);
      expect(addon.add(-3, 2)).to.equal(-1);
      expect(addon.add(-2, 3)).to.equal(1);
      expect(addon.add(3, -2)).to.equal(1);
    });

  });

});
