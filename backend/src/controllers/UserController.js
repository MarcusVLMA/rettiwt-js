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
    },
    async searchByName(req, res) {
        try {
            const regex = new RegExp(req.params.username, 'i');
            const users = await User.find({ username: regex }).exec();
            return res.json(users); 
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async follow(req, res) {
        try {
            const userToFollow = await User.findById(req.body.userIdToFollow);

            if(userToFollow) {
                const user = await User.findById(req.userId);
            
                user.following.push(userToFollow._id);
                userToFollow.followed.push(user._id);

                user.save();
                userToFollow.save();

                return res.json({ message: 'Successfully followed user!' });
            } else {
                return res.status(400).json({ error: 'User not found' });
            }
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    },
    async unfollow(req, res) {
        try {
            const userToUnfollow = await User.findById(req.body.userIdToUnfollow);
            
            if(userToUnfollow) {
                const user = await User.findById(req.userId);

                for(let i = 0; i < user.following.length; i++) {
                    if(user.following[i].equals(userToUnfollow._id)) {
                        user.following.splice(i, 1);
                        break;
                    }
                }
                
                for(let i = 0; i < userToUnfollow.followed.length; i++) {
                    if(userToUnfollow.followed[i].equals(user._id)) {
                        userToUnfollow.followed.splice(i, 1);
                        break;
                    }
                }
                
                user.save();
                userToUnfollow.save();

                return res.json({ message: 'Successfully unfollowed user!' });
            } else {
                return res.status(400).json({ error: 'User not found' });
            }
        } catch (error) {
            return res.json({ error: String(error) }, 500);
        }
    }
};