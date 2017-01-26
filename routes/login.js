const express = require('express'),
    router = express.Router(),
    query = require('../queries');

router.get('/', (req, res) => {
  if (req.query.e === 'invalid') {
    let error = 'Your email and password combination was invalid.';
    res.render('login', {error});
  }
  else {
    res.render('login');
  }
});
router.post('/', (req, res) => {
    let email = req.body.email,
    password = req.body.password;
    console.log('pass', password)

    query.find_user(email).then(user => {
      console.log(user[0].password);
      password === user[0].password ?
      res.redirect('/user?user=' + user[0].id) : res.redirect('/login?e=invalid')
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    })
});

module.exports = router;
