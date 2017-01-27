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

router.post('/check_tag/', (req, res) => {
  let tag = String(req.body.tag);
  let user_id = Number(req.body.user_id);
  query.check_tag(tag)
    .then(real_tag => {
      console.log('real_tag.length '+real_tag.length);
      if (real_tag.length < 1) {
        //add tag to tags, users_tags, and users
        query.add_new_tag(tag, user_id);
        res.status(200).json("tag was added");
      } else {
        //add tag to users and users_tags
        query.add_tag_to_user(tag, user_id);
        //res.status(200).send("tag was added to user");
        res.status(200).json("tag was added to user");
      }
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err);
    });
});

router.get('/:tags', (req, res) => {
  let tags = String(req.params.tags);
  let tag_arr = tags.split('&');
  res.send(tag_arr);
});

module.exports = router;
