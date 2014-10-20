var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    nib = require('nib'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');

module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str)
        .set('filename', path)
        .set('compress', true)
        .use(nib());
    }
    app.set('title', 'My MEAN site');
    app.get('title');
    console.log(app.get('title'));

    //app.set('views', __dirname + '/server/views');
    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');

    app.use(logger('dev'));

    //app.use(cookieParser('foo'));


    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    //app.use(bodyParser());


    app.use(session({
        secret: 'foo'}//,
        //secure: false}
    ));

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(stylus.middleware(
        {
            src: config.rootPath + '/public',
            dest: config.rootPath + '/public',
            // src: __dirname + '/public',
            // dest: __dirname + '/public',
            debug: true,
            force: true,
            compile: compile
        }
    ));

    /*var options = {
      dotfiles: 'ignore',
      etag: false,
      extensions: ['htm', 'html'],
      index: false,
      maxAge: '1d',
      redirect: false,
      setHeaders: function (res, path) {
       res.set('Content-Encoding', 'gzip'),
        //res.set('content-type', 'application/javascript');
        //res.set('Content-Type', 'Script');
      }
    };
*/
    
   // app.use(express.static(config.rootPath + '/public/vendor/angular/', options));
    app.use(express.static(config.rootPath + '/public'));
    //app.use(express.static(__dirname + '/public'));
    //app.use(express.static(path.join(__dirname, 'public')));
};
