var auth = require('./auth')
mongoose  = require('mongoose'),
User = mongoose.model('User');

module.exports = function (app) {

    app.get('/api/users', auth.requiresRole('admin') , function(req, res){
        console.log('');
        User.find({}).exec(function(err, collection){

            res.send(collection);
        });

    });
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

    //app.get('/');
    app.get('*', function(req,res){
        /*res.render('index', {
            mongoMessage: mongoMessage
        });*/
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
};