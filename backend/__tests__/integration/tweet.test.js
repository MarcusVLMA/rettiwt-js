const request = require('supertest');
const factory = require('../factories');
const User = require('../../src/models/User');
const Tweet = require('../../src/models/Tweet');
const { app } = require('../../src/app');
const { truncate, login } = require('../utils');

describe('Create Tweet', () => {
    var jwtToken;

    beforeAll(async () => {
        jwtToken = await login();
    });

    afterEach(truncate);

    it('should succesfully create a tweet', async () => {
        const user = await factory.create('User');

        const response = await request(app).post('/tweets').send({
            authorId: user._id,
            text: 'test-tweet'
        }).set('Authorization', `Bearer ${jwtToken}`);

        expect(response.body).toHaveProperty('_id');
    });

    it('should not create tweet for invalid user id', async () => {
        const response = await request(app).post('/tweets').send({
            authorId: 'inexistent-id',
            text: 'test-tweet'
        }).set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(500);
    });
});

describe('Find Tweets', () => {
    var jwtToken;

    beforeAll(async () => {
        jwtToken = await login();
    });

    afterEach(truncate);

    it('should find tweet by id', async () => {
        const tweet = await factory.create('Tweet');
        const response = await request(app).get(`/tweets/${tweet._id}`).set('Authorization', `Bearer ${jwtToken}`);
        
        expect(response.body._id).toBe(String(tweet._id));
    });

    it('should find a list of tweets', async () => {
        const firstTweet = await factory.create('Tweet');
        const secondTweet = await factory.create('Tweet');

        const response = await request(app).get('/tweets').set('Authorization', `Bearer ${jwtToken}`);

        var isFirstTweetPresent = false;
        var isSecondTweetPresent = false;
        response.body.forEach((tweet) => {
            tweet._id === String(firstTweet._id) ? isFirstTweetPresent = true : null;
            tweet._id === String(secondTweet._id) ? isSecondTweetPresent = true : null;
        });
        
        expect(isFirstTweetPresent && isSecondTweetPresent).toBe(true);
    });

    it('should not return a tweet with invalid id', async () => {
        const tweet = await factory.create('Tweet');
        const response = await request(app).get(`/tweets/${tweet._id + 'invalid-id'}`).set('Authorization', `Bearer ${jwtToken}`);
        
        expect(response.status).toBe(500);
    });
});

describe('Delete Tweet', () => {
    var jwtToken;

    beforeAll(async () => {
        jwtToken = await login();
    });

    afterEach(truncate);

    it('should sucessfuly delete tweet', async () => {
        const user = await factory.create('User');
        const tweet = await factory.create('Tweet', {
            author: user._id
        });

        await request(app).delete('/tweets').send({
            _id: tweet._id
        }).set('Authorization', `Bearer ${jwtToken}`);

        const tweetToCompare = await Tweet.findById(tweet._id);

        expect(tweetToCompare).toBe(null);
    });

    it('should remove tweet from user tweets list when delete tweet', async () => {
        const user = await factory.create('User');
        const tweet = await factory.create('Tweet', {
            author: user._id
        });
        user.tweets.push(tweet);
        await user.save();
        
        await request(app).delete('/tweets').send({
            _id: tweet._id
        }).set('Authorization', `Bearer ${jwtToken}`);

        const userToCompare = await User.findById(user._id).populate('tweets');

        expect(userToCompare.tweets.length).toBe(0);
    });

    it('should not delete if tweet id is invalid', async () => {
        const user = await factory.create('User');
        const tweet = await factory.create('Tweet', {
            author: user._id
        });

        const response = await request(app).delete('/tweets').send({
            _id: tweet._id + 'invalid-tweet-id'
        }).set('Authorization', `Bearer ${jwtToken}`);

        expect(response.status).toBe(500);
    });
});