mongoose-denormalize
====================

Bidirectional denormalization for your Mongoose models

Example
-------

    var mongoose = require('mongoose');
    var denormalize = require('mongoose-denormalize');

    var User = new mongoose.Schema({
        username: String
    });

    var Post = new mongoose.Schema({
        user: { type: mongoose.Schema.ObjectId, ref: 'User' }
    });
    
    Post.plugin(denormalize, {
        username: { from: 'user' }
    });
    
    User.plugin(denormalize, {
        username: { to: 'Post', ref: 'user' }
    });
    
Usage
-----

#### Denormalizing from a foreign model ####

In the example above each `Post` references a `User`.  Suppose we'd like to
denormalize the referenced `User`'s `username` into each `Post`.

```javascript
Post.plugin(denormalize, {
    username: { from: 'user' }
});
```
    
Upon saving a `Post`, this denormalizes the user (referenced by the key `user`) into
`user_username`.  The key in which denormalized data is stored can be overridden by
specifying an alternate `key` option.  Note that `User`'s `username` is assumed to be
of type `String` unless a `type` option is specified above.

#### Denormalizing into a referencing model ####

In the example above, when we update a `User`, we'd like to push values to any
referencing models that are denormalizing `User` keys (i.e. `username`)- ensuring
denormalized data is kept current.

```javascript
User.plugin(denormalize, {
    username: { to: 'Post', ref: 'user' }
});
```

When a `User` is saved, the value of `username` will be updated in all `Post`s
referencing the user (the referencing key is specified via the `ref` option).
By default the `username` will be stored in `user_username` unless overridden by
specifying a `key` option.

Install
-------

    npm install mongoose-denormalize

Tests
-----

    make test

You can optionally specify the MongoDB URI to be used for tests:

    MONGODB_URI=mongodb://localhost:27017/mongoose_denormalize_tests make test