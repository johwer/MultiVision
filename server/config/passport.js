var passport = require('passport'),
    mongoose = require('mongoose'),
    LocalStrategy = require('passport-local').Strategy,
    User = mongoose.model('User');


module.exports = function (){ 

    console.log('User model in serverjs'+ User);

    //var searchedUser = User.findOne({username: 'joe'});

    //console.log(searchedUser.collection());

    passport.serializeUser(function (user, done){
     if (user){
        done(null, user._id);
     }
    });

    passport.deserializeUser(function(id, done){
        User.findOne({id:id}).exec(function(err, user){
            if(user){
                return done(null, user);
            } else{
                return done(null, false);
            }   
        });
    });

    passport.use(new LocalStrategy(
      function(username, password, done) {
        console.log('username in passport use Server.js' +username);
        //console.log(username);
        User.findOne({username: username}).exec(function(err, user){
            if(user && user.authenticate(password)){
                console.log('In User findOne user '+ user);
                return done(null, user);

            } else {
                console.log('user false');
                return done(null, false);
            }
        });


        /*User.findOne({ username: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          if (!user.validPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
          }
          return done(null, user);
        });*/
      }  
    ));
};