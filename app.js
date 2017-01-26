require('dotenv').config();
const express = require('express'),
    app = express(),
    body_parser = require('body-parser'),
    hbs = require('hbs'),
    path = require('path'),
    routes = require('./routes/index'),
    login = require('./routes/login'),
    passport = require('passport'),
    local_strategy = require('passport-local').Strategy,
    session = require('express-session'),
    query = require('./queries');

hbs.localsAsTemplateData(app);
app.use(body_parser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);
app.use('/login', login);
// set the view engine to hbs
app.set('view engine', 'hbs');
app.set('port', process.env.PORT || 3000);

module.exports = app;
