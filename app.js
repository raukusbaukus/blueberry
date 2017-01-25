require('dotenv').config();
const express = require('express'),
    app = express(),
    body_parser = require('body-parser'),
    path = require('path'),
    routes = require('./routes/index'),
    login = require('./routes/login.js'),
    passport = require('passport'),
    local_strategy = require('passport-local').Strategy,
    session = require('express-session'),
    query = require('./queries');

app.use(body_parser());
// app.use(passport.initialize());
// app.use(passport.session());
//
//
// passport.use(new local_strategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true
//         // session: false
//     },
//
//     (req, email, password, done) => {
//         query.find_user(email).then(user => {
//                 console.log('found a user', user)
//             })
//             .catch(err => {
//                 console.error('error', err);
//             })
//         // if (!user) { return done(null, false); }
//         // if (!user.verifyPassword(password)) { return done(null, false); }
//         // return done(null, user);
//     }));
//
//

app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);
app.use('/login', login);
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
module.exports = app;
