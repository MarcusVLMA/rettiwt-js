const User = require('../models/User');
const Tweet = require('../models/Tweet');

module.exports = {
    async save(req, res) {
        try {
            const { username, password } = req.body;
        
            const user = await User.create({
                username,
                password
            });

            return res.json(user);
        } catch(error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async find(req, res) {
        try {
            if(req.params.userId) {
                const user = await User.findById(req.params.userId).populate('tweets');

                return res.json(user);
            } else {
                const users = await User.find().populate('tweets');

                return res.json(users);
            }
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async update(req, res) {
        try {
            await User.update({ _id: req.body.id }, req.body, (error, response) => {
                if(error) {
                    throw new Error('Could not update this user right now. Please, try again later.');
                }

                return res.json({ updatedUsers: response.nModified });
            });
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async delete(req, res) {
        try {
            await Tweet.deleteMany({ author: req.body.id }, async (error, response) => {
                if(error) {
                    throw new Error('Could not delete this user right now. Please, try again later.');
                }

                await User.deleteOne({ _id: req.body.id }, (error, userResponse) => {
                    if(error) {
                        throw new Error('Could not delete this user right now. Please, try again later.');
                    }

                    return res.json({
                        deletedTweets: response.deletedCount,
                        deletedUsers: userResponse.deletedCount
                    });
                });
            });
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    }
};