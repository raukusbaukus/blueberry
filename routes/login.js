const express = require('express'),
    router = express.Router(),
    argon2 = require('argon2'),
    query = require('../queries');

router.get('/', (req, res) => {
    if (req.session.id) {
        res.redirect('/events');
    } else {
        let error;
        if (req.query.e === 'invalid') {
            error = 'Your email and password combination was invalid.';
        } else if (req.query.e === 'restricted') {
            error = 'You must be logged in to view that page';
        }
        res.render('login', {
            error
        })
    }
});
router.post('/', (req, res) => {
    query.find_user(req.body.email)
        .then(user => {
            argon2.verify(user[0].password, req.body.password)
                .then(match => {
                    if (match) {
                        req.session.user = user[0].id
                        res.render('index')
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
