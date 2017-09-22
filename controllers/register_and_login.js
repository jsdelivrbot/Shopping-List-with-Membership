var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
// var jwt = require('jsonwebtoken');
var passport = require('passport');
var session = require('express-session');

var models_user = require('../models/user');

var User = models_user.User;
var secret = models_user.secret;

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app){

  app.get('/register', function(req, res){
    res.render('register', {login: false});
  });

  app.post('/register', urlencodedParser, function(req, res){
    if(req.body.username!='' && req.body.password!=''){
      // encrypt the userpassword //
      bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(req.body.password, salt, function(err, hash){

          var user = new User({
            username: req.body.username,
            password: hash
          });

          user.save(function(err){
            if (err) throw err;
          });

        });
      });

    }
    res.end('success');
  });

  app.post('/register/checkUsername', urlencodedParser, function(req, res){

    User.find({username: req.body.username}, function(err, data){
      if(err) throw err;
      if(data==''){
        res.end();
      }else{
        res.end('existed');
      }

    });

  });

  app.get('/login', function(req, res){
    res.render('login', {login: false});
  });

  app.post('/login', urlencodedParser, function(req, res){
    User.findOne({username: req.body.username}, function(err, data){
      if(err) throw err;
      // console.log(data);
      if(data==null){
        res.end('error');
      }else{
        bcrypt.compare(req.body.password, data.password, function(err, success){
          if(err) throw err;

          if(success){
              req.login(data.username, function(err){
                if(err) throw err;
                res.json({
                  success: true,
                  username: data.username
                });
              });

          }else{
            res.json({
              success: false,
              username: null
            });
          }
        });
      }
    });
  });

  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });

  app.get('/changePassword', authenticationMiddleware(), urlencodedParser, function(req, res){
    // console.log(req.user);
    // console.log(req.isAuthenticated());

    res.render('changePassword', {login: true});

  });

  app.post('/changePassword', authenticationMiddleware(), function(req, res){
    console.log(req.user);
    console.log(req.isAuthenticated());

    User.findOne({username: req.user}, function(err, data){
      if(err) throw err;
      // console.log(data);
      if(data==null){
        res.json({success: true, errormsg: "user not found"});
      }else{
        bcrypt.compare(req.body.oldpassword, data.password, function(err, success){
          if(err) throw err;
          if(!success){
            res.json({
              success: false,
              errormsg: "Old password incorrect!"
            });
          }else{
            // update the username password with the new one //
          }
        });
      }
    });

  });

  passport.serializeUser(function(username, done) {
    done(null, username);
  });

  passport.deserializeUser(function(username, done) {
    done(null, username);
  });

  function authenticationMiddleware() {
    return (req, res, next) => {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

        if (req.isAuthenticated()) return next();

        res.redirect('/login');
      }
  }
}
