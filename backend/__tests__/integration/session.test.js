const request = require('supertest');
const bcrypt = require('bcrypt');

const factory = require('../factories');
const { truncate } = require('../utils');
const { app } = require('../../src/app');


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