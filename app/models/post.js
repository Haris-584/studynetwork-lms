
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var postSchema = Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    time: {
        type: Date,
    },
    description: {
        type: String
    },
    media: {
        filename: String,
        path: String
    },
    tag: {
        type: String,required:true
    },
    postType: {
        type: String
    }
    
});

var Post = mongoose.model('post', postSchema);

module.exports = {Post};