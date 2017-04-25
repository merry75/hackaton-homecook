var express = require('express');
var router = express.Router();
var User = require("../models/userModel");
var passport = require('passport');



//the '/users' routes will go here
router.post('/register', function(req, res, next) {
  User.register(new User({ username: req.body.username }), req.body.password, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send(req.user);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user.username)
});

router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});

router.get('/currentuser', function(req, res) {
  if (req.user) {
    res.send(req.user.username)
  } else {
    res.send(null)
  }
});

module.exports = router;