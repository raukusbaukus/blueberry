const express = require('express'),
    router = express.Router(),
    queries = require('../queries'),
    passport = require('passport'),
    local_strategy = passport.('passport-local').Strategy;

passport.use(new local_strategy((username, password, done) => {
  User.findOne({username}, (err, user) => {
    
  });
}));

router.post('/login', passport.authenticate('local'), (req, res) => {

    res.redirect('/users/' + req.user.username);
});
