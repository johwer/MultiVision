var User = require('mongoose').model('User'),
    encrypt = require('../utilities/encryption');


exports.getUsers = function(req, res){
    User.find({}).exec(function(err, collection){

        res.send(collection);
    });
};

exports.createUser = function(req, res, next){
    var userData = req.body;
    userData.username = userData.username.toLowerCase();

    var pwdObj = encrypt.Pwd.setPwd(userData.password);
    userData.salt = pwdObj.salt;
    userData.hashed_pwd = pwdObj.hasPwd;

    User.create(userData, function(err, user){
        if(err){
            if(err.toString().indexOf('E11000') > -1) {
                err = new Error('Duplicate Username');
                console.log('DUPLICATE USERNAME');
            }
            console.log('This is the error' +err);
            res.status(400);
            return res.send({reason:err.toString()});
        }
        req.logIn(user, function(err){
            if(err){
                return next(err);
            }
            res.send(user);
        });
    });
};

exports.updateUser = function (req, res){
    var userUpdates = req.body;

    console.log('Printing req.user._id');
    ///console.log(req);

    

    console.log(userUpdates.firstname);
    console.log(userUpdates.lastname);
    console.log(userUpdates.username);
    console.log(userUpdates.password);
    console.log(userUpdates._id);

    //Update obj
    var updateObj = {
        firstname: userUpdates.firstname,
        lastname: userUpdates.lastname,
        username: userUpdates.username,
    };

    if(userUpdates.password){
        console.log('Update password');
        var pwdObj = encrypt.Pwd.setPwd(userUpdates.password);
        updateObj.salt = pwdObj.salt;
        updateObj.hashed_pwd = pwdObj.hasPwd; 
    }

    
    console.log('User updates' +userUpdates);
    //console.log(req);
    // res.status(400);

    User.findOneAndUpdate({ _id: userUpdates._id }, updateObj, function (err, kitten) {
      if (err) return handleError(err);
      if (kitten) {
        console.log(kitten);
        // doc may be null if no document matched
        res.send(userUpdates);
      }
    });    


    // if(req.user._id != userUpdates._id && !req.user.hasRole('admin')){
    //     res.status(403);
    //     return res.end();
    // } else{

    // }

    // //User update

    // req.user.firstname = userUpdates.firstname;
    // req.user.lastname = userUpdates.lastname;
    // req.user.username = userUpdates.username;

    // if (userUpdates.password && userUpdates.password > 0) {
    //     var pwdObj = encrypt.Pwd.setPwd(userUpdates.password);
    //     req.user.sale = pwdObj.salt;
    //     req.user.hashed_pwd = pwdObj.hasPwd;
    // }
    // req.user.save(function(err){
    //     if(err){
    //         res.status(400);
    //         return res.send({reason: err.toString()});
    //     }
    //     res.send(req.user);
    // });
};