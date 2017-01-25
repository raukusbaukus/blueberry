require('dotenv').config();
const express = require('express'),
    app = express(),
    path = require('path'),
    routes = require('./routes/index');

app.use(express.static(path.join(__dirname, 'public')));
app.use("/", routes);
// set the view engine to ejs
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

module.exports = app;
