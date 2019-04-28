var app = angular.module('myApp', []);
app.controller('empCtrl', function($scope, $http,$location,$window) {

    /***********For Add student detail into database***********/ 
    $scope.user = function(info) {
        $http.post('http://localhost:3000/api/'+'viewemployee',info).then(successCallback, errorCallback);

        function successCallback(response){
            console.log(info)
        }
        function errorCallback(error){
            //error code
        }
    };
    $scope.redirect = function(){
        $window.location.href='emp_list.html';
    }

});
