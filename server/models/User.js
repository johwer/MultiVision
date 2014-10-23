var mongoose = require('mongoose'),
    encrypt = require('../utilities/encryption');

//Read from Mongodb with mongoose
var userSchema = mongoose.Schema({
    firstname: {type: String, required: '{PATH} is required!'},
    lastname: {type: String, required: '{PATH} is required!'},
    username: {
        type: String,
        required: '{PATH} is required!',
        unique: true
    },
    salt: {type: String, required: '{PATH} is required"'},
    hashed_pwd: {type: String, required: '{PATH} is required!'},
    roles: [String] 
});

userSchema.methods = {
    authenticate : function (passwordToMatch) {
        console.log('this salt '+typeof this.salt);
        console.log('passwordToMatch ' +typeof passwordToMatch);
        console.log('this.hashed_pwd '+typeof this.hashed_pwd);
        console.log('hasPwd(this.salt, passwordToMatch)' +typeof encrypt.Pwd.hasPwd(this.salt, passwordToMatch));

        if(encrypt.Pwd.hasPwd(this.salt, passwordToMatch).toString() === this.hashed_pwd.toString()){
            console.log('MATCH');                
        } else{
            console.log('INCORRECT');
        }

        return encrypt.Pwd.hasPwd(this.salt, passwordToMatch).toString() === this.hashed_pwd.toString();
    },
    hasRole: function (role){
        return this.roles.indexOf(role) > -1;
    }
};

var User = mongoose.model('User', userSchema);

console.log('User in mongoose' + User);

function createDefaultUsers() {
    User.find({}).exec(function(err, collection){
        if(collection.length === 0){
            
            var pwdObj = encrypt.Pwd.setPwd('joe'); 
            User.create({
                firstname:'Joe', lastname: 'Eames', username: 'joe', salt: pwdObj.salt, hashed_pwd: pwdObj.hasPwd, roles: ["admin"]
            });
            
            pwdObj = encrypt.Pwd.setPwd('john');
            User.create({
                firstname:'John', lastname: 'Papa', username: 'john', salt: pwdObj.salt, hashed_pwd: pwdObj.hasPwd, roles: []
            });
            
            pwdObj = encrypt.Pwd.setPwd('dan');
            User.create({
                firstname:'Dan', lastname: 'Wahlin', username: 'dan', salt: pwdObj.salt, hashed_pwd: pwdObj.hasPwd
            });

            console.log('Create user');
        } else{
            console.log('Users exist' +collection);
        }
    });
}

exports.createDefaultUsers = createDefaultUsers;

/*var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});*/