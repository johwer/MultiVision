var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function (config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function() {
        console.log('multivision db opened');
    });

    //Read from Mongodb with mongoose
    var userSchema = mongoose.Schema({
        firstname: String,
        lastname: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String] 
    });

    userSchema.methods = {
        authenticate : function (passwordToMatch) {
            console.log('this salt '+typeof this.salt);
            console.log('passwordToMatch ' +typeof passwordToMatch);
            console.log('this.hashed_pwd '+typeof this.hashed_pwd);
            console.log('hasPwd(this.salt, passwordToMatch)' +typeof hasPwd(this.salt, passwordToMatch));

            if(hasPwd(this.salt, passwordToMatch).toString() === this.hashed_pwd.toString()){
                console.log('MATCH');                
            } else{
                console.log('INCORRECT');
            }

            return hasPwd(this.salt, passwordToMatch).toString() === this.hashed_pwd.toString();
        }
    };

    var User = mongoose.model('User', userSchema);

    console.log('User in mongoose' + User);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            
            var pwdObj = setPwd('joe');
            User.create({
                firstname:'Joe', lastname: 'Eames', username: 'joe', salt: pwdObj.salt, hashed_pwd: pwdObj.hasPwd, roles: ["admin"]
            });
            
            pwdObj = setPwd('john');
            User.create({
                firstname:'Johan', lastname: 'Papa', username: 'john', salt: pwdObj.salt, hashed_pwd: pwdObj.hasPwd, roles: []
            });
            
            pwdObj = setPwd('dan');
            User.create({
                firstname:'Dan', lastname: 'Wahlin', username: 'dan', salt: pwdObj.salt, hashed_pwd: pwdObj.hasPwd
            });

            console.log('Create user');
        } else{
            console.log('Users exist' +collection);
        }
    });
    /*var messageSchema = mongoose.Schema({message: String});
    var Message = mongoose.model('Message', messageSchema);
    var mongoMessage;
    Message.findOne().exec(function(err, messageDoc){
        mongoMessage = messageDoc.message;
    });*/
};

function setPwd(pwd){
  var pwdObj = {};
  pwdObj.salt = createSalt();
  pwdObj.hasPwd = hasPwd(pwdObj.salt, pwd);

  return pwdObj;
}

function createSalt() {
    console.log(crypto.randomBytes(128).toString('base64'));
    return crypto.randomBytes(128).toString('base64');
}

function hasPwd(salt, pwd) {
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex1');
}