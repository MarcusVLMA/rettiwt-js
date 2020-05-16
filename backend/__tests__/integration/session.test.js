const request = require('supertest');
const { app } = require('../../src/app');
const factory = require('../factories');
const { truncate } = require('../utils');


describe('Authentication', () => {
    beforeEach(truncate);

    it('should return JWT token', async () => {
        const user = await factory.create('User', {
            password: '123'
        });

        const response = await request(app).post('/authenticate').send({
            username: user.username,
            password: '123'    
        });

        expect(response.body).toHaveProperty('token');
    });

    it('should not authenticate with inexistent username', async () => {
        const response = await request(app).post('/authenticate').send({
            username: 'Inexistent-User',
            password: '123'
        });

        expect(response.status).toBe(400);
    });

    it('should not authenticate with wrong password', async () => {
        const user = await factory.create('User');
        
        const response = await request(app).post('/authenticate').send({
            username: user.username,
            password: 'wrong-password'
        });

        expect(response.status).toBe(400);
    });
});

describe('Register', () => {
    beforeEach(truncate);

    it('should not register existent user', async () => {
        const user = await factory.create('User', {
            username: 'existing-user'
        });

        const response = await request(app).post('/register').send({
            username: user.username,
            password: user.password
        });

        expect(response.status).toBe(409);
    });

    it('should register a new user', async () => {
        const response = await request(app).post('/register').send({
            username: 'new-user',
            password: '123456'
        });
        
        expect(response.body.username).toBe('new-user');
    });
});