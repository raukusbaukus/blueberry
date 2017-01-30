const express = require('express'),
    router = express.Router(),
    argon2 = require('argon2'),
    query = require('../queries');

router.get('/', (req, res) => {
    if (req.session.user) {
        res.redirect('/events');
    } else {
        let error = req.query.e === 'invalid' ?
            'Your email and password combination was invalid.' :
            req.query.e === 'restricted' ?
            'You must be logged in to view that page' :
            req.query.e === 'unauthorized' ?
            'This isn\'t yours to update' :
            false;
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
                        console.log('req session path in login post', req.session.cookie.path)
                        req.session.cookie.path == '/' ?
                        res.redirect('/events') :
                        res.redirect(req.session.cookie.path);
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
