
angular.module('userController' , ['userServices'])
app.controller('regCtrl' , function($http,$location){
var app=this;
    this.regUser = function(regData){
        app.errorMsg=false;

       
        $http.post('/api/users',this.regData).then(function(data){
            console.log(data.data.success);
            console.log(data.data.message);
            if(data.data.success){
                app.successMsg=data.data.message;
                
               
        
               
            }
            else{
                app.successMsg=false;
                app.errorMsg=data.data.message;   
            }
        });
    };
}); 