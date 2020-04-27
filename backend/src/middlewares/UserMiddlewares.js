const bcrypt = require('bcrypt');

module.exports = {
    hashPassword(next) {
        if(!this.isModified('password')) {
            return next();
        }
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    }
};