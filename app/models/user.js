var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs')

var UserSchema = new Schema({
    username: {type:String, required: true , lowercase :true},
    password: {type:String, required:true },
    email : {type:String , required :true , unique :true ,lowercase:true },
    gender: {type: String, enum: ['Male', 'Female'], default: 'Male'},
    userType: {type: String, enum: ['Student', 'Instructor'], default: 'Student'},
    dateOfBirth: {type: String, default: ''},
    universityName:{type:String, required: true ,  lowercase :true},
    dicipline:{type:String, required: true,lowercase :true },
    city:{type:String, required: true },
    country:{type:String, required: true },
    college:{type:String,   lowercase :true},
    college_from:{type:String,   lowercase :true},
    college_to:{type:String,  lowercase :true},
    uni_from:{type:String, lowercase :true},
    uni_to:{type:String,  lowercase :true},
    description:{type:String,  lowercase :true}

    
});

UserSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password , null , null , function(err, hash){
        if(err) return next(err);
        user.password = hash;
        next();

    });

});


UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password , this.password);
  };
  

module.exports = mongoose.model( 'User' , UserSchema);
