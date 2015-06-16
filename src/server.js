'use strict';

var express = require('express');
var api = require('./server/api.js');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var server = express();
var isProduction = process.env.NODE_ENV === 'production';
var publicPath = path.resolve(__dirname, './public');

server.set('views', path.join(__dirname, 'templates'));
server.set('view engine', 'jade');
server.set('port', process.env.PORT || 3000);

server.use(session({
    secret: 'shhhh, very secret',
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
        expires: new Date(Date.now() + 60 * 60 * 10000),
        maxAge: 60*60*10000
    }
}));
server.use(cookieParser());
server.use(express.static(publicPath));

server.locals.pretty = true; // make jade output nice html
server.locals.title = 'UDM - Clickdummy';
server.locals.isProduction = isProduction;

// We require the bundler inside the if block because
// it is only needed in a development environment.
if (!isProduction) {
    var bundle = require('./server/bundle.js');
    bundle();
}

server.use(function(req, res, next){
    res.locals.loggedin = req.session.loggedin;
    res.locals.username = req.session.username;
    res.locals.clientid = req.session.clientid;
    next();
});

// clickdummy api
server.use('/', api(server));

/// catch 404 and forward to error handler
server.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
server.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// And run the server
server.listen(server.get('port'), function () {
    if(isProduction) {
        console.log('Server running on port ' + server.get('port'));
    }
});
