/* eslint-disable*/
const dotenv = require('dotenv');
const path = require('path');
const root = path.join.bind(this, __dirname);
dotenv.config({path: root('.env')});

module.exports = {
    MONGO_URL: process.env.MONGO_URL,
    PORT : process.env.PORT || 6000,
    SESSION_SECRET: process.env.SESSION_SECRET,
    IS_PRODICTION: process.env.NODE_ENV === 'production',
    PER_PAGE: process.env.NODE_ENV
};