var crypto = require('crypto');

exports.Pwd = {
    setPwd : function(pwd){
      var pwdObj = {};
      pwdObj.salt = this.createSalt();
      pwdObj.hasPwd = this.hasPwd(pwdObj.salt, pwd);

      return pwdObj;
    },
    createSalt : function() {
        console.log(crypto.randomBytes(128).toString('base64'));
        return crypto.randomBytes(128).toString('base64');
    },
    hasPwd : function(salt, pwd) {
        var hmac = crypto.createHmac('sha1', salt);
        return hmac.update(pwd).digest('hex1');
    }
};

