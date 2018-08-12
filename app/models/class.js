
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var classSchema = Schema({
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
    
    classname: {
        type: String
    },
    classId: {
        type: Schema.Types.ObjectId,
        ref: 'classdetail'
    }

    // connectedUserIds: {
    //     type: [{
    //         type: Schema.Types.ObjectId,
    //         ref: 'User'
    //     }],
    //     default: []
    // },

    
});

var classz = mongoose.model('class', classSchema);

module.exports = {classz};