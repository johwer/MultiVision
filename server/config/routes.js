var auth = require('./auth'),
users = require('../controllers/users'),
courses = require('../controllers/courses'),
mongoose  = require('mongoose'),
User = mongoose.model('User');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole('admin'), users.getUsers);
    app.post('/api/users', users.createUser);
    app.put('/api/users', users.updateUser);

    app.get('/api/courses', courses.getCourses);
    //app.get('/api/courses:id', courses.getCourseById);
    
    //One folder inside
    /*app.get('/partials/:partialPath', function (reg, res) {
        res.render('partials/' + reg.params.partialPath);
    });*/

    app.get('/partials/*', function (reg, res) {
        res.render('../../public/app/' + reg.params[0]);
    });


    /*app.get('/login',
      passport.authenticate('basic', { session: false }),
      function(req, res) {
        console.log(req.user);
        //res.json({ id: req.user.id, username: req.user.username });
    });
    */

    app.post('/login', auth.authenticate);
    
    app.post('/logout', function(req, res){
        //Clear local storage
        req.logout();
        res.end();
    });

   app.all('/api/*', function(req, res) {
        res.send(404);
    });

    //app.get('/');
    app.get('*', function(req, res){
        /*res.render('index', {
            mongoMessage: mongoMessage
        });*/
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};