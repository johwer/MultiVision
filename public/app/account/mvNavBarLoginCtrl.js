angular.module('app').controller('mvNavBarLoginCtrl', function($scope, $http, mvIdentity, mvNotifier, mvAuth, $location){
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password){
        console.log("I'm not done yet");

        console.log(username);
        console.log(password);
        //mvNotifier.notify('You have successfully signed in!');

        mvAuth.authenticateUser(username, password).then(function(success){
            if(success){
                console.log('You have been success');
                mvNotifier.notify('You have successfully signed in!');
            } else{
                console.log('You have been NOT success');
                mvNotifier.notify('Username/Password combination incorrect');
            }

        });

        /*mvAuth.authenticateUser(username, password, function (success){
            if(success){
                console.log('You have been success');
                mvNotifier.notify('You have successfully signed in!');
            } else{
                console.log('You have been NOT success');
                mvNotifier.notify('Username/Password combination incorrect');
            }

        });*/
    };
    $scope.signout = function(){
        mvAuth.logoutUser().then(function(){
            console.log('You signed out');
            $scope.username = "";
            $scope.password = "";
            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
        });
    };
});