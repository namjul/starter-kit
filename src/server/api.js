/*jslint curly: false, bitwise: true */

'use strict';

var express = require('express');
var fs = require('fs');
var markdown = require('markdown').markdown;
var basicAuth = require('basic-auth');
var archiver = require('archiver');
var pjson = require('../../package.json');

var router = express.Router();

module.exports = function(app) {

  // Setup HTTP Auth
  router.get('/*', function(req, res, next) {
    function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    }

    var user = basicAuth(req);

    if(app.get('env') !== 'production') {
      return next();
    }

    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    }

    if (user.name === 'udmsk' && user.pass === 'thisisudm') {
      return next();
    } else {
      return unauthorized(res);
    }
  });

  // Login/Logout route
  var user = [{
    name: 'Hausladen',
    id: '1234567'
  }, {
    name: 'Mustermann1988m-Mustermann',
    id: '98723948729384709238'
  }];
  router.post('/login', function(req, res) {

    req.session.regenerate(function(){
      var currentUser = user[Math.floor(Math.random() * user.length)];
      req.session.loggedin = true;
      req.session.username = currentUser.name;
      req.session.clientid = currentUser.id;
      res.redirect('back');
    });
  });

  router.get('/logout', function(req, res){
    req.session.destroy(function(){
      res.redirect('back');
    });
  });


  // Overview route
  router.get('/', function(req, res) {
    var routes = router.stack.filter(function(value) {
      return value.hasOwnProperty('route') && ['/login', '/logout', '/*'].indexOf(value.route.path) < 0 ? true : false;
    });

    fs.readFile('./CHANGELOG.md', 'utf8', function (err, data) {
      if (err) {
        throw err;
      }
      res.render('index', { version: pjson.version, routes: routes, history: markdown.toHTML( data.toString() ) });
    });
  });

  // Download ZIP Archive
  router.get('/clickdummy-' + pjson.version + '.zip', function(req, res) {
    var archive = archiver('zip');

    archive.on('error', function(err) {
      throw err;
    });

    archive.pipe(res);

    archive.bulk([
      {
        src: ['**'],
        dest: 'clickdummy-' + pjson.version,
        data: { date: new Date()},
        expand: true,
        cwd: 'build'
      }
    ]);

    archive.finalize();
  });

  router.get('/page', function(req, res) {
    res.render('page');
  });

  return router;

};

