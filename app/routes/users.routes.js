let userModel = require('../models/users.model.js'),
userController = require('../controllers/users.controllers');


let appVersion = '/api/v1' ;

module.exports = (app) => {

  app.post(appVersion + '/user/signup',
    userController.userSignUp
  );

};
