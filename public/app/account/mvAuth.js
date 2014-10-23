angular.module('app').factory('mvAuth', function($http, mvIdentity, $q, mvUser, localStorageService){
    return {
        authenticateUser: function(username, password){
            var dfd = $q.defer();

            $http.post('/login', {username: username, password: password})
                .then(function(response){
                    if(response.data.success){
                        var user = new mvUser();
                        angular.extend(user, response.data.user);

                        /*console.log(user);

                        console.log('response.data.user' + response.data.user);
                        console.log('response.data.user.firstname' + response.data.user.firstname);
                        console.log('response.data.user.salt' + response.data.user.salt);*/

                        mvIdentity.currentUser = user;
                        console.log('logged in!');
                        //Set user logged in for local storage and mvIdentity
                        localStorageService.set('multiVisionUser', response.data.user);
                        dfd.resolve(true);
                    } else{
                        dfd.resolve(false);
                        console.log('failed to log in');
                    }
               
                });
                return dfd.promise;
        },
        createUser: function(newUserData){
            var newUser = new mvUser(newUserData);
            var dfd = $q.defer();

            newUser.$save().then(function(){
                mvIdentity.currentUser = newUser;
                dfd.resolve();
            }, function(response){
                dfd.reject(response.data.reason);
            });

            return dfd.promise;
        },
        updateCurrentUser: function(newUserData){
            var dfd = $q.defer();

            var clone = angular.copy(mvIdentity.currentUser);
            angular.extend(clone, newUserData);
            //clone.$save();
            
            clone.$update().then(function() {
                mvIdentity.currentUser = clone;

                var currentLocalObj = localStorageService.get('multiVisionUser');

                currentLocalObj.fistname = newUserData.firstname;
                currentLocalObj.lastname = newUserData.lastname;
                currentLocalObj.username = newUserData.username;


                localStorageService.set('multiVisionUser', currentLocalObj);
                dfd.resolve();
            }, function() {
                dfd.reject(response.data.reason);
            });
            return dfd.promise;
        },
        logoutUser: function(){
            var dfd = $q.defer();
            console.log('Do http post');
            //var state = false;
            $http.post('/logout', {logout:true}).then(function(){
                mvIdentity.currentUser = undefined;
                // Remove local storage
                localStorageService.remove('multiVisionUser');
                dfd.resolve();
            });
            return dfd.promise;
        },
        authorizeCurrentUserForRoute: function(role){
            //if(myIdentity.currentUser && myIdentity.currentUser.roles.indexOf('admin')){
            if(mvIdentity.isAuthorized('admin')){
                return true;
            } else{
                return $q.reject('not authorized');
            }
        },
        authorizeAuthenticatedtUserForRoute: function(){
            if(mvIdentity.isAuthenticated()){
                return true;
            } else{
                return $q.reject('not authorized');
            }
        }
    };
});