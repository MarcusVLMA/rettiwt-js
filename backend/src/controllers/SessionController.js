const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
    async authenticate(req, res) {
        const { username, password } = req.body;
        
        const user = await User.findOne({ username }).select('+password');
    
        if(!user) {
            return res.status(400).json({ error: 'Invalid username' });
        }

        if(! await bcrypt.compare(password, user.password)) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        // eslint-disable-next-line no-undef
        const token = jwt.sign({ id: user._id }, process.env.AUTH_SECRET_HASH, {
            expiresIn: 86400 // 1 day
        });

        user.password = undefined;

        return res.json({ user, token });
    },
    async register(req, res) {
        try {
            const { username, password } = req.body;
            
            var user = await User.findOne({ username });
            if(user) {
                return res.json(user, 409);
            }
            
            user = await User.create({
                username,
                password
            });

            return res.json(user);
        } catch(error) {
            return res.json({ error: String(error) }, 500);
        }
    },
};