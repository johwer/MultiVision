var express = require('express'),
    mongoose = require('mongoose');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);


//Read from Mongodb wiyh mongoose
/*var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});*/

require('./server/config/routes')(app);

app.listen(config.port);

console.log('Listening on port' +config.port + '...');
