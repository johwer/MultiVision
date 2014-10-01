var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    nib = require('nib');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path) {
    return stylus(str)
    .set('filename', path)
    .set('compress', true)
    .use(nib());
}
app.set('title', 'My MEAN site');
app.get('title');
console.log(app.get('title'));

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');

app.use(logger('dev'));


app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

//app.use(bodyParser());

app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        dest: __dirname + '/public',
        debug: true,
        force: true,
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));

if (env === 'development') {
    mongoose.connect('mongodb://localhost/multivision');
} else{
    mongoose.connect('mongodb://admin:ninja01@ds041380.mongolab.com:41380/multivision');
}


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function() {
    console.log('multivision db opened');
});

//Read from Mongodb wiyh mongoose
/*var messageSchema = mongoose.Schema({message: String});
var Message = mongoose.model('Message', messageSchema);
var mongoMessage;
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});*/


app.get('/partials/:partialPath', function (reg, res) {
    res.render('partials/' + reg.params.partialPath);
});

//app.get('/');
app.get('*', function(reg,res){
    /*res.render('index', {
        mongoMessage: mongoMessage
    });*/
    res.render('index');
});

var port = process.env.PORT || 3030;
app.listen(port);

console.log('Listening on port' +port + '...');
