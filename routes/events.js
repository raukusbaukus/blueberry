require('dotenv').config();
const express = require('express'),
  app = express(),
  body_parser = require('body-parser'),
  hbs = require('hbs'),
  path = require('path'),
  routes = require('./index'),
  router = express.Router(),
  login = require('./login'),
  event = require('./event'),
  events = require('./events')
passport = require('passport'),
  local_strategy = require('passport-local').Strategy,
  session = require('express-session'),
  query = require('../queries');

hbs.localsAsTemplateData(app);
app.use(body_parser.urlencoded({
  extended: true
}));

router.get('/', (req, res) => {
  res.render('events', {
    events,
    me: {
      id: 2
    }
  }); //this is a placeholder object definition
});

module.exports = router;
