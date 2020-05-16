const { factory } = require('factory-girl');
const User = require('../src/models/User');
const Tweet = require('../src/models/Tweet');

factory.define('User', User, {
    username: 'test-user',
    password: 'test-password'
});

factory.define('Tweet', Tweet, {
    text: 'test-tweet',
    author: 'some-user-id'
});

module.exports = factory;