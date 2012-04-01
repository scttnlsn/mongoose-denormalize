var assert = require('assert');
var mongoose = require('mongoose');
var helpers = require('./helpers');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mongoose_denormalize_tests');

describe('Denormalize', function() {
    var bar;
    
    beforeEach(function(next) {
        bar = new helpers.Bar({ baz: 'qux' });
        bar.save(next);
    });
    
    describe('when denormalizing from foreign ref', function() {
        it('saves foreign value into local model', function(next) {
            var foo = new helpers.Foo({ bar: bar._id });
            foo.save(function(err) {
                if (err) return next(err);
    
                assert.equal(foo.bar_baz, 'qux');
                next();
            });
        });
    });

    describe('when denormalizing into foreign ref', function() {
        var foo;

        beforeEach(function(next) {
            foo = new helpers.Foo({ bar: bar._id });
            foo.save(next);
        });
        
        it('saves local values into foreign model', function(next) {
            bar.baz = 'quux';
            bar.save(function(err) {
                if (err) return next(err);
                
                helpers.Foo.findOne({ _id: foo._id }, function(err, foo) {
                    if (err) return next(err);
                    
                    assert.equal(foo.bar_baz, 'quux');
                    next();
                });
            });
        });
    });
});