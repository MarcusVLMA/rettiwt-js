const { factory } = require('factory-girl');
const User = require('../src/models/User');

factory.define('User', User, {
    username: 'test-user',
    password: 'test-password'
});

module.exports = factory;