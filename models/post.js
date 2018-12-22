var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs'); // надо разобратся - нужна для создание url для поста 
const tr = require('transliter'); // переводит текст для чтения URLSlugs

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body:{
        type:String
    }

},{
    timestamps: true  
});

schema.plugin(
    URLSlugs('title', {
        field: 'url',
        generator : text=> tr.slugify(text)
    })
);

schema.set('toJSON', {
    virtuals: true
});

module.exports = mongoose.model('Post', schema);