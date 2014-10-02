var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    nib = require('nib');

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


    app.use(bodyParser.urlencoded({
      extended: true
    }));

    app.use(bodyParser.json());

    //app.use(bodyParser());

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

    app.use(express.static(config.rootPath + '/public'));
    //app.use(express.static(__dirname + '/public'));
    //app.use(express.static(path.join(__dirname, 'public')));
};
