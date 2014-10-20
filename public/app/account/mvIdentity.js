angular.module('app').factory('mvIdentity', function(localStorageService, mvUser){
    var currentUser;

    //The service will run and look if localStorage is provide
    //setStorageType is default localStorage otherwise it will run with cookie fallback
    
    //localStorageService.clearAll();
    
    if(localStorageService.get('multiVisionUser')){
        currentUser = new mvUser();
        //The service does fromJson
        angular.extend(currentUser, localStorageService.get('multiVisionUser'));
    }

    console.log(typeof currentUser);
    console.log(currentUser);

   

    return{
        currentUser: currentUser,
        isAuthenticated: function(){
            return  !!this.currentUser;
        },
        isAuthorized: function(roles){
            return !!this.currentUser && this.currentUser.roles.indexOf(roles) > -1;
        }
    };
});

