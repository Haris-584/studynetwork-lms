
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var groupSchema = Schema({
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
    
    postType: {
        type: String
    }
    
});

var group = mongoose.model('group', groupSchema);

module.exports = {group};