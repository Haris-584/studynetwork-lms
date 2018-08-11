// console.log('testing main controller');
angular.module('mainController', ['authServices'])

.controller('mainCtrl' , function(Auth , $scope, $timeout , $location , $rootScope, $window, $http){
    var app= this;
    app.loadme = false;

    $rootScope.$on('$routeChangeStart' ,function(){
        
    if(Auth.isLoggedIn()){
        //console.log('Succes user is logged in ');
        app.isLoggedIn = true;
        Auth.getUser().then(function(data){
         
            app.username = data.data.username;
            app.useremail = data.data.email;
            app._id = data.data._id;
            
        $http.post('/api/search', {email: app.useremail}).then((result) => {
            app.data=result.data;
        }).catch((err) => {
            console.log(err);
        });
    
            //app.userdicipline=data.data.dicipline;
            app.loadme = true;
            if( location.href=="http://localhost:8000/login"|| location.href=="http://localhost:8000/#register" || location.href=="http://localhost:8000/"){
                $location.path("/home");
            }
            
        });
    }else {
       // console.log('Failure : User is not logged in'); 
        app.isLoggedIn= false;
        app.username = ''; 
        app.loadme = true;
        if(!(location.href=="http://localhost:8000/login"||location.href=="http://localhost:8000/#register")){
            $location.path("/login");
        }

    }

    });

    this.dologin = function(loginData){
        app.loading= true;
        app.errorMsg=false;
    
        Auth.login(app.loginData).then(function(data){
           console.log(data.data);
            if(data.data.success){
                app.loading= false;
                app.successMsg=data.data.message + '...Redirecting';
                $timeout(function(){
                    $location.path('/home');

                    app.loginData ='';
                    app.successMsg = false;
                }, 2000);
    
            }else{
                app.loading= false;
                app.errorMsg = data.data.message;
            }
        });
    };

        this.logout = function(){
            Auth.logout();
            $location.path('/logout');
            $timeout(function(){
                $location.path('/login');
            },2000)
              
        };

        this.searchValue = '';
        this.searchedData = [];
    
        this.searchUser = function() {
            $http.post('/api/notify', {
                email: this.searchValue
            }).then((result) => {
                this.searchedData = result.data;
                console.log(this.searchedData)
            }).catch((err) => {
                console.log(err);
            })
        }
    
    });
    






