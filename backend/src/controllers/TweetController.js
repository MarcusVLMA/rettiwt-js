const Tweet = require('../models/Tweet');
const User = require('../models/User');

module.exports = {
    async save(req, res) {
        try {
            const user = await User.findById(req.userId);
            
            const tweet = await Tweet.create({ 
                text: req.body.text,
                author: user._id
            });
            
            user.tweets.push(tweet);
            await user.save();

            return res.json(tweet);
        } catch(error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async find(req, res) {
        try {
            if(req.params.tweetId) {
                const tweet = await Tweet.findById(req.params.tweetId).populate('author', 'username');

                return res.json(tweet);
            } else {
                const tweets = await Tweet.find().populate('author', 'username');

                return res.json(tweets);
            }
        } catch(error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async delete(req, res) {
        try {
            const tweet = await Tweet.findById(req.body._id);
            var user = await User.findById(tweet.author);

            const response = await Tweet.deleteOne({ _id: req.body._id });
            
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