const { mongoose } = require('../src/app');

module.exports = { 
    async truncate() {
        await mongoose.connection.dropDatabase();
    }
};