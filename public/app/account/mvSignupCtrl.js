angular.module('app').controller('mvSignupCtrl', function($scope, mvUser, mvNotifier, $location, mvAuth){
   console.log('Binding mvSignupCtrl JEEEEE');

   $scope.signup = function(){
        console.log('BINDING SIGNUP WOWWWWW');
        var newUserData = {
            username: $scope.email,
            password: $scope.password,
            firstname: $scope.fname,
            lastname: $scope.lname
        };

        mvAuth.createUser(newUserData).then(function(){
            mvNotifier.notify('User account created');
            $location.path('/');
        }, function(reason) {
            mvNotifier.error(reason);
        });
   };
});