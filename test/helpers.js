var mongoose = require('mongoose');
var denormalize = require('../lib/index');

var FooSchema = new mongoose.Schema({
    bar: { type: mongoose.Schema.ObjectId, ref: 'Bar' },
});

FooSchema.plugin(denormalize, {
    baz: { from: 'bar' },
});

var BarSchema = new mongoose.Schema({
    baz: { type: String }
});

BarSchema.plugin(denormalize, {
    baz: { to: 'Foo', ref: 'bar' }
});

exports.Foo = mongoose.model('Foo', FooSchema);
exports.Bar = mongoose.model('Bar', BarSchema);