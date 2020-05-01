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
            if(req.params.id) {
                const tweet = await Tweet.findById(req.params.id);

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