

//packages
var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
//var passport = require('passport');
//var social = require('./app/passport/passport')(app,passport);



//middleware
app.use(morgan('dev'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

//mongo database connection
mongoose.connect('mongodb://localhost:27017/practice', function(err){
    if(err){
        console.log("not connected successfully " + err);
    }else{
        console.log("connect to MongoDb");
    }
});


app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname + '/public/app/views/mainpage.html'));

 });


//routes here if not in another files
    

app.listen(port , function(){
    console.log("server is ruuning at port" + port);
});

