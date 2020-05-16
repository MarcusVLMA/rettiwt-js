const request = require('supertest');
const factory = require('../factories');
const bcrypt = require('bcrypt');
const User = require('../../src/models/User');
const { app } = require('../../src/app');
const { truncate, login } = require('../utils');


describe('Find User', () => {
    var jwtToken;

    beforeAll(async () => {
        jwtToken = await login();
    });

    afterEach(truncate);

    it('should return created user', async () => {
        const user = await factory.create('User');
        const response = await request(app).get(`/users/${user._id}`).set('Authorization', `Bearer ${jwtToken}`);

        expect(response.body.username).toBe('test-user');
    });

    it('should return a list of users', async () => {
        await factory.create('User');
        await factory.create('User', {
            username: 'test-user-2'
        });
        
        const response = await request(app).get('/users').set('Authorization', `Bearer ${jwtToken}`);

        var isFirstUserPresent = false;
        var isSecondUserPresent = false;
        
        response.body.forEach((user) => {
            if(user.username === 'test-user') {
                isFirstUserPresent = true;
            }

            if(user.username === 'test-user-2') {
                isSecondUserPresent = true;
            }
        });

        expect(isFirstUserPresent && isSecondUserPresent).toBe(true);
    });

    it('should not return a user with invalid id', async () => {
        const user = await factory.create('User');
        const response = await request(app).get(`/users/${user._id + 'invalid-id'}`).set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(500);
    });
});

describe('Update users', () => {
    var jwtToken;

    beforeAll(async () => {
        jwtToken = await login();
    });

    afterEach(truncate);

    it('should succesfully update user username', async () => {
        const user = await factory.create('User');
        
        const newUsername = 'updated-test-user';

        await request(app).put('/users').send({
            _id: user._id,
            username: newUsername
        }).set('Authorization', `Bearer ${jwtToken}`);

        const userToCompare = await User.findById(user._id);

        expect(userToCompare.username).toBe(newUsername);
    });

    it('should succesfully update user password', async () => {
        const user = await factory.create('User');
        
        const newPassword = 'updated-test-password';

        await request(app).put('/users').send({
            _id: user._id,
            password: newPassword
        }).set('Authorization', `Bearer ${jwtToken}`);
        
        const userToCompare = await User.findById(user._id).select('+password');
        const passwordsAreEqual = await bcrypt.compare(newPassword, userToCompare.password);
        
        expect(passwordsAreEqual).toBe(true);
    });

    it('should not update inexistent user', async () => {
        const response = await request(app).put('/users').send({
            _id: 'inexistent-id',
            username: 'inexistent-username',
            password: 'inexistent-password',
        }).set('Authorization', `Bearer ${jwtToken}`);
        
        expect(response.status).toBe(500);
    });
});

describe('Delete users', () => {
    var jwtToken;

    beforeAll(async () => {
        jwtToken = await login();
    });

    afterEach(truncate);

    it('should succesfully delete user', async () => {
        const user = factory.create('User');

        await request(app).delete('/users').send({
            id: user.id
        }).set('Authorization', `Bearer ${jwtToken}`);

        const searchedUser = await User.findById(user._id);

        expect(searchedUser).toBe(null);
    });

    it('should not delete if user id is invalid', async () => {
        const user = await factory.create('User');

        const response = await request(app).delete('/users').send({
            _id: user._id + 'invalid-user-id'
        }).set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(500);
    });
});