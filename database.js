let config = require('./config');
var mongoose = require('mongoose');

module.exports = () => {
    return new Promise((resolve, reject)=> {
        mongoose.Promise= global.Promise;
        mongoose.set('debug', true);

        mongoose.connection
          .on('error', error => reject(error))
          .on('close', ()=> console.log('Database connection close'))
          .once('open', ()=> resolve(mongoose.connection));
        mongoose.connect(config.MONGO_URL, {useMongoClient: true});
    });
};