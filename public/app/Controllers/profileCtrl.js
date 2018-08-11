angular.module('profileControllers', [])

.controller('profileCtrl', ['$routeParams', '$http', '$scope', function($routeParams, $http, $scope) {
    var data = {
        userProfileId: $routeParams.userId
    };
   
    $http.post('/api/getProfileDetails', data).then((result) => {
        $scope.userDetails = result.data;
    }).catch((err) => {
        console.log(err);
    });


}])