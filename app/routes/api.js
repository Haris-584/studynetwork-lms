var User  = require('../models/user');
var {Post} = require('../models/post');
var jwt = require('jsonwebtoken');
var secret= 'harry';
var {group} = require('../models/group');
var {classz} = require('../models/class');
var {classdet} = require('../models/classdetail')

var multer = require('multer');

module.exports = function(router) {
    
    //user registration
    router.post('/users', function(req, res) {  
        var user=new User();
        user.username=req.body.username;
        user.password= req.body.password;
        user.email=req.body.email;
        user.dicipline=req.body.dicipline;
        user.universityName=req.body.universityName;
        user.city=req.body.city;
        user.country=req.body.country;
        user.country=req.body.country;
        user.college=req.body.college;
        user.college_from=req.body.college_from;
        user.college_to=req.body.college_to;
        user.uni_from=req.body.uni_from;
        user.uni_to=req.body.uni_to;
        user.description=req.body.description;
        user.dateOfBirth = req.body.day + '-' + req.body.month + '-' + req.body.year;
        user.userType = req.body.userType;
        user.gender = req.body.gender;

        user.temporarytoken=jwt.sign({ username: user.username, email: user.email, city: user.city} , secret ,{expiresIn:'24h'});
        if (req.body.username == null || req.body.username == '' || req.body.password === null || req.body.password == ''
         || req.body.email == null || req.body.email == '' || req.body.universityName == null || req.body.universityName == '' 
         ||req.body.city == null || req.body.city == ''|| req.body.dicipline == null  || req.body.country == null ) {


            res.json({ success: false , message:'Ensure All Details were Provided'});
        
        } else {
           user.save(function(err){
             if(err){
                res.json({ success: false , message:'Username and Email Already Taken'});
              
             }else{
                res.json({ success: true , message:'User Created'});

             }
       
      });

        }
    });
        router.post('/search', function(req, res){
            console.log(req.body);
            User.findOne({email:req.body.email}).exec().then((result) => {
                res.json(result);
            }, (err) => {
                res.json(err);
            }); 
      
      });

      //user authentication
      router.post('/authenticate', function(req,res){
        User.findOne({email: req.body.email}).select('_id email username  password dicipline').exec(function(err,user){
           if(err) throw err;
           if (!user){
               res.json({success: false, message:'could not authenticate user'});
            } else if(user){
               if(req.body.password){
                  var validpassword= user.comparePassword(req.body.password);
              } else{
                  res.json({success: false, message:'no password provided'});
              }
              if(!validpassword){
                 res.json({success: false, message:'could not authenticate password'});
              } else{
              // res.json({success: true, message:'User authenticate'});
               var token=jwt.sign({ _id: user._id, username: user.username, email: user.email,} , secret ,{expiresIn:'24h'});
               res.json({success:true, message:'USER AUTHENTICATED', token: token});
             }

          }

      });
  });



        router.use(function(req,res,next){
            var token =req.body.token ||req.body.query ||req.headers['x-access-token'];
            if(token){
                //verify token
                jwt.verify(token, secret,function(err, decoded){
                    if(err) {
                        res.json({ success:false, message:'token invalid'});
                    }  else{
                        req.decoded = decoded;
                        next();
                    }                  
                });
            } else{
                res.json({ success:false, message:'no token provided'});
            }
        });

        router.post('/me', function(req,res){
            res.send(req.decoded);
        });


        router.post('/getProfileDetails', function(req, res) {
            User.findOne({ _id: req.body.userProfileId}).exec().then((result)=> {
                res.json(result);
            }).catch((err) => {
                res.json(err);
            });
        });
              
        router.post('/notify', function(req, res){
            User.find({ email:{ $regex: req.body.email, $options: 'i' }}).exec().then((result) => {
                res.json(result);
            }, (err) => {
                res.json(err);
            });
        });


        


        router.get('/newsfeedposts', (req, res) => {
            Post.find({postType: 'newsfeed'}).populate('author', 'username email').sort({time: -1}).exec().then((resp) => {
                res.json(resp);
            }).catch((err) => {
                res.json(err);
            });
        });


        router.get('/groupposts', (req, res) => {
            group.find({postType: 'group'}).populate('author', 'username email').sort({time: -1}).exec().then((resp) => {
                res.json(resp);
            }).catch((err) => {
                res.json(err);
            });
        });


        router.get('/classposts', (req, res) => {
            classz.find({postType: 'class'}).populate('author', 'username email').sort({time: -1}).exec().then((resp) => {
                res.json(resp);
            }).catch((err) => {
                res.json(err);
            });
        });

        var storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, './public/media')
            },
            filename: function (req, file, cb) {
                var datetimestamp = Date.now();
                cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
            }
        });
        var upload = multer({ storage: storage });

        router.post('/newsfeednewpost', upload.single('file'), (req, res) => {
            var post = new Post();
            post.author = req.body.newPost.author;
            post.media.filename = req.file.filename;
            post.media.path = req.file.path;
            post.postType = 'newsfeed';
            post.time = new Date().getTime();
            post.description = req.body.newPost.description;
            post.tag = req.body.newPost.tag;
            
            post.save().then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err);
            });
          
        });
  

        router.post('/groupnewpost', upload.single('file'), (req, res) => {
            console.log(req.body.newgroup);
            var post = new group();
            post.author = req.body.newgroup.author;
            post.media.filename = req.file.filename;
            post.media.path = req.file.path;
            post.postType = 'group';
            post.time = new Date().getTime();
            post.description = req.body.newgroup.description;
            
            post.save().then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err);
            });
          
        });
        router.post('/classnewpost', upload.single('file'), (req, res) => {
            console.log(req.body.newclass);
            var post = new classz();
            post.author = req.body.newclass.author;
            post.media.filename = req.file.filename;
            post.media.path = req.file.path;
            post.postType = 'class';
            post.time = new Date().getTime();
            post.description = req.body.newclass.description;
            
            post.save().then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err);
            });
          
        });

        router.post('/createNewClass' , (req , res) => {
            var cd = new classdet();
            cd.classname = req.body.createname;
            cd.classcode = req.body.createcode;

            cd.save().then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err);
            });
          
        });

        router.post('/add/userToClass', (req, res) => {
            let updateFields = {
                $push: {
                    connectedUserIds: req.body.joiningid
                }
            };
            var post = new classdet();
            
            classdet.findOneAndUpdate({classname: req.body.joiningname , classcode: req.body.joiningcode}, updateFields, {new: true}).populate('connectedUserIds').then((result) => {
                res.json(result);
            }).catch((err) => {
                res.json(err);
            });
          
        });
      return router;
      
    
    }
