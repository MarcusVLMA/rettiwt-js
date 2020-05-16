const bcrypt = require('bcrypt');

module.exports = {
    hashPasswordOnSave(next) {
        if(!this.isModified('password')) {
            return next();
        }
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    },
    hashPasswordOnUpdate(next) {
        if(!this._update.password) {
            return next();
        }
        this._update.password = bcrypt.hashSync(this._update.password, 10);
        next();
    }
};