var mongoose = require('mongoose'),
    courseModel = require('../models/Course'),
    userModel = require('../models/User');

module.exports = function (config){
    mongoose.connect(config.db);
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function() {
        console.log('multivision db opened');
    });

    userModel.createDefaultUsers(); 
    courseModel.createDefaultCourses();
};