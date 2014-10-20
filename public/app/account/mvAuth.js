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
        }

    };
});