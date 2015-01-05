var express = require('express');
var passport = require('passport');
var Account = require('../models/account');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register', { });
});


router.post('/register', function(req, res) {
  Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

router.get('/ping',isLoggedIn, function (req, res) {
  res.redirect('/YouareAuthorised');
});


// route middleware to make sure a user is logged in. Use for every route that needs authentication
function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on
  if (req.isAuthenticated())
    return next();

    // if they aren't redirect them to the home page
    res.redirect('/notAllowed');
  }


module.exports = router;
