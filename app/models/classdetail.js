
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var classdetail = Schema({
   
    connectedUserIds: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        default: []
    },

    classname : {
        type :String
    },
    classcode : {
        type :String
    }
    
});

var classdet = mongoose.model('classdetail', classdetail);

module.exports = {classdet};