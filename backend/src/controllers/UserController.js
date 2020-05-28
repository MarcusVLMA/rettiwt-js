const User = require('../models/User');
const Tweet = require('../models/Tweet');

module.exports = {
    async find(req, res) {
        try {
            // If a ID parameter is provided, use it. If don't, use ID decoded from JWT Token
            var userId = req.params.userId ? req.params.userId : req.userId;

            const user = await User.findById(userId).populate('tweets', '-author');
            return res.json(user);
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async findAll(req, res) {
        try {
            const users = await User.find().populate('tweets', '-author');
            return res.json(users);
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async update(req, res) {
        try {
            const response = await User.updateOne({ _id: req.body._id }, req.body);

            return res.json({ wasUserUpdated: Boolean(response.nModified) });
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async delete(req, res) {
        try {
            const tweetResponse = await Tweet.deleteMany({ author: req.body._id });
            const userResponse = await User.deleteOne({ _id: req.body._id });
            
            return res.json({
                deletedTweets: tweetResponse.deletedCount,
                deletedUsers: userResponse.deletedCount
            });
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    }
};