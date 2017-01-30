const express = require('express'),
    router = express.Router(),
    argon2 = require('argon2'),
    query = require('../queries');

//PROHIBITED
router.get('/', (req, res) => {
    if (req.session) {
        res.redirect('/events');
    } else {
        if (req.query.e === 'invalid') {
        let error = 'Your email and password combination was invalid.';
        res.render('login', {
            error
        });
    } else {
        res.render('login');
    }
    } 
});
router.post('/', (req, res) => {
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
                        err
                    })
                })
        })
        .catch(err => {
            console.error(err);
            res.render('error', {
                err
            });
        })
});

module.exports = router;
