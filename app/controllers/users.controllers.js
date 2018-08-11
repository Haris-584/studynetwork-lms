const mongoose = require('mongoose');
User = mongoose.model('users');


let userSignUp = (req, res, next) => {

let newUserCreate = new User({
  firstName: req.body.firstName,
  lastName: req.body.lastName
});



newUserCreate.save((err) => {
  if (err) {
    res.json({
      success: 0,
      message: 'Error while user signup.',
      data: {err}
    });
  } else {
    res.json({
      success: 1,
      message: 'User signup successfully.',
      data: {}
    });
  }
});





};

module.exports = {
  userSignUp
};
