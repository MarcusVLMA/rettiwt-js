const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

class User extends Model {
    static init(sequelize) {
        super.init({
            username: DataTypes.STRING,
            password: DataTypes.STRING,
        }, {
            sequelize,
            hooks: {
                beforeCreate: (user) => {
                    {
                        user.password = bcrypt.hashSync(String(user.password), 10);
                    } 
                }
            }
        });
    }
}

module.exports = User;