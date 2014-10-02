module.exports = function (app) {
    //One folder inside
    /*app.get('/partials/:partialPath', function (reg, res) {
        res.render('partials/' + reg.params.partialPath);
    });*/

    app.get('/partials/*', function (reg, res) {
        res.render('../../public/app/' + reg.params[0]);
    });

    //app.get('/');
    app.get('*', function(reg,res){
        /*res.render('index', {
            mongoMessage: mongoMessage
        });*/
        res.render('index');
    });
};