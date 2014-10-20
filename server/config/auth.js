var passport = require('passport');

exports.authenticate = function(req, res, next){

    var auth = passport.authenticate('local', function(err, user){
        if(err){
            console.log('err '+err);
            return next(err);

        } 
        if(!user){
            console.log(user);
            console.log('success false');
            res.send({success:false});
        }

        req.logIn(user, function(err){
            if(err) {
                console.log('err '+ err);
                return next(err);
            }
            /*var property = 'user';
            req[property] = user;
            req._passport.instance._userProperty = user.roles[0];*/

            console.log(req._passport);
            console.log('****************************');
            console.log(req._passport.instance);
            console.log('****************************');
            console.log(req._passport.instance._userProperty);

            var limitedUser = Object.create(user);



         

            /*Delete or set undefiend*/

            // Delete don't seem to work in this case
            //delete limitedUser.salt;
            //delete limitedUser.hashed_pwd;

            //Undefined seems to work
            limitedUser.salt = undefined;
            limitedUser.hashed_pwd = undefined; 

            console.log('limitedUser with deleted props'+ limitedUser);

            console.log('NEW limitedUser');

            console.log(typeof user.toString());
            console.log('login and sending back'+user);
            console.log('new login obj sends back'+ limitedUser);
            console.log(typeof limitedUser);

            //Setup local storage

            res.send({success: true, user: limitedUser});
        });
    });

    auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next){

    if(!req.isAuthenticated()){
        res.send(403);
        res.end();
    } else{
        next();
    }
};

exports.requiresRole = function(role) {
    return function(req, res, next){
        console.log('****************************');
        console.log(req._passport);
        console.log('****************************');
        console.log(req._passport.instance);
        console.log('****************************');
        console.log(req._passport.instance._userProperty);

        console.log('passprt '+ !!req._passport);
        console.log('passport inctance'+ !!req._passport.instance);
        console.log('Is auth '+req.isAuthenticated());
        console.log('Find req.users');
        //console.log(req.users['roles']);
        //console.log(req.users.roles);
        if(!req.isAuthenticated()){
            res.status(403);
            res.end();
        } else{
            next();
        }
    };
};
