
const dotenv = require('dotenv');
const path = require('path');
const root = path.join.bind(this, __dirname);
dotenv.config({path: root('.env')});

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    PORT : process.env.PORT || 6000,
    IS_PRODICTION: process.env.NODE_ENV === 'production'
};