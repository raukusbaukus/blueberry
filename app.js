require('dotenv').config();
const express = require('express'),
    app = express(),
    body_parser = require('body-parser'),
    hbs = require('hbs'),
    path = require('path'),
    routes = require('./routes/index'),
    passport = require('passport'),
    local_strategy = require('passport-local').Strategy,
    session = require('express-session'),
    query = require('./queries');

hbs.localsAsTemplateData(app);
app.use(body_parser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new local_strategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
        // session: false
    },

    (req, email, password, done) => {
        query.find_user(email).then(user => {
                console.log('found a user', user)
            })
            .catch(err => {
                console.error('error', err);
            })
        // if (!user) { return done(null, false); }
        // if (!user.verifyPassword(password)) { return done(null, false); }
        // return done(null, user);
    }));


app.post('/login', passport.authenticate('local'), (req, res) => {
    console.log('HI!', req);
    res.redirect('/users/' + req.user.username);
});

app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);
// set the view engine to hbs
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

module.exports = app;
