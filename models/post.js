var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type:String
    }
});
module.exports = mongoose.model('Post', schema);