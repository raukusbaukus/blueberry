const express = require('express'),
    router = express.Router(),
    queries = require('../queries'),
    passport = require('passport'),
    local_strategy = require('passport-local').Strategy;

console.log('login.js');
passport.use(new local_strategy((username, password, done) => {
  User.findOne({username}, (err, user) => {

  });
}));

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.redirect('/users/' + req.user.username);
});
