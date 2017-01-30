const express = require('express'),
    router = express.Router(),
    argon2 = require('argon2'),
    query = require('../queries');

router.get('/', (req, res) => {

  if(req.session){
    let me = {id:req.session.cookie.user}
    if (req.query.e === 'invalid') {
        let error = 'Your email and password combination was invalid.';
        res.render('login', {
            me,
            error
        });
    } else {
        res.render('login');
    }

  }else {
    res.redirect('/login?e=restricted');
  }
});

// ------
router.post('/', (req, res) => {
  if(req.session){
    let me = {id:req.session.cookie.user}
    query.find_user(req.body.email)
        .then(user => {
            argon2.verify(user[0].password, req.body.password)
                .then(match => {
                    if (match) {
                        res.render('me', {
                            user
                        })
                    } else {
                        res.redirect('/login?e=invalid');
                    }
                })
                .catch(err => {
                    console.error(err);
                    res.render('error', {
                        me,
                        err
                    })
                })
        })
        .catch(err => {
            console.error(err);
            res.render('error', {
                me,
                err
            });
        })
      }else {
        res.redirect('/login?e=invalid');
      }
});

module.exports = router;
