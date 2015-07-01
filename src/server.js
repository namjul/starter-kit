'use strict';

var express = require('express');
var api = require('./server/api.js');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var server = express();
var isProduction = process.env.NODE_ENV === 'production';
var publicPath = path.resolve(__dirname, '../public');

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
server.use(bodyParser.json());
server.use(express.static(publicPath));

server.locals.pretty = true; // make jade output nice html
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

// Handle 404
server.use(function(req, res) {
  res.status(400);
  res.render('error', {title: '404: File Not Found'});
});

// Handle 500
server.use(function(error, req, res, next) {
  res.status(500);
  res.render('error', {title:'500: Internal Server Error', error: error});
});

// And run the server
server.listen(server.get('port'), function () {
    if(isProduction) {
        console.log('Server running on port ' + server.get('port'));
    }
});
