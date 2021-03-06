
angular.module('groupControllers', ['ngFileUpload'])

.controller('groupCtrl', ['$scope', '$http','Upload', '$routeParams', function($scope, $http, Upload, $routeParams) {
    var app = this;

    // Get all the post for user timeline
    $scope.posts = [];
    $http.get('/api/groupposts').then((posts) => {
        $scope.posts = posts.data;
        posts.data.forEach(function(post) {
            post.time = moment(post.time).fromNow();
        });
    }).catch((err) => {
        console.log(err);
    }); // End of getting all posts


    $scope.newgroup = {};
    $scope.newgroup.author = '';
    $scope.newgroup.description = '';
    $scope.newgroup.tag = '';
    
    $scope.submit = function(userId) {
        console.log(userId);
        $scope.newgroup.author = userId;
        if ($scope.form.file.$valid && $scope.file) {
            $scope.upload($scope.file);
          

         }
       
    };

    // upload on file select or drop
    $scope.upload = function (file) {
        Upload.upload({
            url: 'api/groupnewpost',
            data: {file: file, newgroup: $scope.newgroup}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
            console.log(resp);
            $http.get('/api/groupposts').then((posts) => {
                posts.data[0].time = moment(posts.data[0].time).fromNow();
                $scope.posts.unshift(posts.data[0]);
            }).catch((err) => {
                console.log(err);
            });

        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
    };


    // $scope.postLiked = (postId, userId, index) => {
    //     $http.post('/api/postLiked', { postId: postId, userId: userId }).then((resp) => {
    //         // $scope.posts[index]
    //     }).catch((err) => {
    //         console.log(err);
    //     })
    // };


}]);