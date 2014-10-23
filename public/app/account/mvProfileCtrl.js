angular.module('app').controller('mvProfileCtrl', function($scope, mvAuth, mvIdentity, mvNotifier){
//angular.module('app').controller('mvProfileCtrl', function($scope,mvIdentity){
    console.log('setting currentUser ' +mvIdentity.currentUser.username);
    console.log('printing currentUser '+$scope.email);
    $scope.email = mvIdentity.currentUser.username;

    console.log('setting currentUser ' +mvIdentity.currentUser.username);
    console.log('printing currentUser '+$scope.email);
    $scope.fname = mvIdentity.currentUser.firstname;
    $scope.lname = mvIdentity.currentUser.lastname;

    //console.log('Setting username JEHHHIHEJJJJJ ' + mvIdentity.currentUser.username);
    console.log('Setting username JEHHHIHEJJJJJ ');

    $scope.update = function(){
        console.log('INSIDE UPDATE WONKA');
        var newUserData = {
            username: $scope.email,
            firstname: $scope.fname,
            lastname: $scope.lname
        };
        console.log('$scope.password' +$scope.password);
        console.log($scope.password > 0);
        //Check if containing ?
        if($scope.password && $scope.password.length > 0) {
        //if($scope.password) {
            newUserData.password = $scope.password;
            console.log('newUserData.password' + newUserData.password);
        } else{
            newUserData.password = undefined;
        }

        mvAuth.updateCurrentUser(newUserData).then(function(){
            mvNotifier.notify('Update Success');
        }, function(reason){
            mvNotifier.error(reason);
        });
    };
});