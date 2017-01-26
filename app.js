require('dotenv').config();
const express = require('express'),
    app = express(),
    body_parser = require('body-parser'),
    hbs = require('hbs'),
    path = require('path'),
    routes = require('./routes/index'),
    login = require('./routes/login'),
    event = require('./routes/event'),
    session = require('express-session'),
    knex_session_store = require('connect-session-knex')(session),
    query = require('./queries'),
    connect = query.connect,
    store = new knex_session_store({
        knex: connect
    })

hbs.localsAsTemplateData(app);
app.use(body_parser.urlencoded({
    extended: true
}));


app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);
app.use('/login', login);
app.use('/event', event);
// set the view engine to hbs
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

module.exports = app;

// const express = require('express');
// const app = express();
//
// const session = require('express-session');
// const KnexSessionStore = require('connect-session-knex')(session);
//
// const Knex = require('knex');
// const knex = Knex({
//     client: 'pg',
//     connection: {
//         host: '127.0.0.1',
//         user: 'postgres',
//         password: '',
//         database: 'travis_ci_test'
//     }
// });
//
// const store = new KnexSessionStore({
//     knex: connect,
//     tablename: 'sessions' // optional. Defaults to 'sessions'
// });


app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 10000 // ten seconds, for testing
    },
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));

let count = 0;

app.use('/', function(req, res, next) {
    var n = req.session.views || 0
    req.session.views = ++n
    res.end(n + ' views')
})
