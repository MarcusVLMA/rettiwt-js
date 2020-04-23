const User = require('../models/User');

module.exports = {
    async save(req, res) {
        const { username, password } = req.body;

        const user = await User.create({ username, password });

        return res.json(user);
    }
};