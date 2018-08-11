// avoid defining modules again and again instead store it in a variable. which is "app"
app.config(function($routeProvider , $locationProvider){

    $routeProvider
    .when('/',{
        templateUrl: 'app/views/pages/login-register.html',
        controller : "regCtrl",
        controllerAs : 'register'
    })
    

    .when('/group', {
        templateUrl: 'app/views/pages/group.html',
        controller : "mainCtrl"
    })

    .when('/home', {
        templateUrl: 'app/views/pages/newsfeed.html',
        controller : "mainCtrl"
    })

    .when('/class', {
        templateUrl: 'app/views/pages/class.html',
        controller : "mainCtrl"
    })



    .when('/About/:userId', {
        templateUrl: 'app/views/pages/timeline-about.html'
    })
    .when('/About', {
        templateUrl: 'app/views/pages/timeline-about.html'
    })

    .when('/edit-profile-basic', {
        templateUrl: 'app/views/pages/edit-profile-basic.html'
    })

    .when('/edit-profil-work-edu', {
        templateUrl: 'app/views/pages/edit-profile-work-edu.html'
    })

    .when('/edit-profile-password', {
        templateUrl: 'app/views/pages/edit-profile-password.html'
    })
    .when('/messages', {
        templateUrl: 'app/views/pages/newsfeed-messages.html'
    })

    .when('/logout', {
        templateUrl: 'app/views/pages/login-register.html'
    })
    .when('/login', {
        templateUrl: 'app/views/pages/login-register.html',
    })
    .when('/search', {
        templateUrl: 'app/views/pages/search.html',
    })
   
   
    .when('/profile', {
        templateUrl: 'app/views/pages/edit-profile-basic.html'
    })

    .when('/notify', {
        templateUrl: 'app/views/pages/notify.html'
    })
   
    .otherwise({ redirectTo:'/' });

    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });

});
