const Tweet = require('../models/Tweet');
const User = require('../models/User');

module.exports = {
    async save(req, res) {
        try {
            const { authorId, text } = req.body;

            const user = await User.findById(authorId);
            await Tweet.create({ 
                text,
                author: user._id
            }, (error, tweet) => {
                if(error) {
                    throw new Error('Could not tweet this. Please, try again later');
                }

                user.tweets.push(tweet);
                user.save();

                return res.json(tweet);
            });
        } catch(error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async find(req, res) {
        try {
            if(req.query.userId) {
                const user = await User.findById(req.query.userId);
                await Tweet.find({
                    'author': { $in: user.following }
                }, (error, tweets) => {
                    if (error) {
                        throw new Error('Could not get tweets now. Please, try again later.');
                    }

                    return res.json(tweets);
                });
            } else if(req.query.id) {
                const tweet = await Tweet.findById(req.query.id);

                return res.json(tweet);
            } else {
                const tweets = await Tweet.find();

                return res.json(tweets);
            }
        } catch(error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async delete(req, res) {
        try {
            const tweet = await Tweet.findById(req.body.id);
            var user = await User.findById(tweet.author);

            const response = await Tweet.deleteOne({ _id: req.body.id });
            
            user.tweets = user.tweets.filter( (userTweet) => {
                return userTweet._id !== tweet._id;
            } );

            user.save();

            return res.json({ deletedTweets: response.deletedCount });
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    }
};