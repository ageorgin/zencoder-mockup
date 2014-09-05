/**
 * Created by ageorgin on 09/07/14.
 */

// Package inclusion
var express = require('express');           // express framework
var app = express();                        // the application
var bodyParser = require('body-parser');
var routeApi = require('./app/route/api');
var routeAdmin = require('./app/route/admin');

var mongoose = require('mongoose');

// application configuration
app.use(bodyParser());

// config static content
app.use(express.static(__dirname + '/public'));

// routing
app.use('/api/v2', routeApi)
    .use('/', routeAdmin)
    .use(function(req, res, next){
        res.redirect('/');
    });

// connection to database
mongoose.connect('mongodb://localhost/zencoder');
var db = mongoose.connection;

// exit on database connexion error
db.on('error', function(){
    console.error('Error connecting to database');
    process.exit();
});

// on db connection success starting http server
db.once('open', function(){
    console.log('Db connection OK');
    var server = app.listen(1337, function() {
        console.log('Listening on port %d', server.address().port);
    });
});


