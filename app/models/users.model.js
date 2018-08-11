let mongoose = require('mongoose'),
  schema = mongoose.Schema;

var userSchema = new schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  userType: {type: String, enum: ['Student', 'Instructor'], default: 'Student'},
  gender: {type: Boolean, default: 0} //0 for male, 1 for female
});

const userSchemaObject = mongoose.model('users', userSchema);

//new userSchemaObject({firstName: 'dummy', lastName: 'dummy'}).save();

module.exports = userSchemaObject;
