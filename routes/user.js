const express = require('express'),
    router = express.Router(),
    argon2 = require('argon2'),
    query = require('../queries');
//
router.get('/create/', (req, res) => {
    if (req.session.user) {
        res.redirect('/events');
    } else {
        res.render('create_user');
    }
});

router.post('/create', (req, res) => {
    if (req.session.user) {
        res.redirect('/events');
    } else {
        argon2.generateSalt(16).then(salt => {
                argon2.hash(req.body.password, salt)
                    .then(hash => {
                        req.body.password = hash;
                        query.create_user(req.body)
                            .then(me => {
                                req.session.user = me[0].id;
                                req.session.cookie.path == '/' ?
                                    res.redirect('/events') :
                                    res.redirect(req.session.cookie.path);
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
                        })
                    })
            })
            .catch(err => {
                console.error(err);
                res.render('error', {
                    err
                })
            })
    }
});
router.get('/read/:id', (req, res) => {
    query.find_user(id)
        .then(user => {
            res.render('read_user', {
                user
            });
        })
        .catch(err => {
            res.render('error', {
                err
            })
        })
});
router.get('/update', (req, res) => {
    if (req.session.user) {
        query.find_user(req.session.user)
            .then(user => {
                res.render('update_user', {
                    user
                });
            })
            .catch(err => {
                res.render('error', {
                    err
                })
            })
    } else {
        res.redirect('/login?e=restricted');
    }
})
router.put('/update/:id', (req, res) => {
    if (req.session.user) {
        let id = Number(req.session.user);
        query.update_user(id)
            .then(user => {
                res.redirect(`/user/read/${id}`);
            })
            .catch(err => {
                res.render('error', {
                    err
                })
            })
    } else {
        res.redirect('/login?e=restricted');
    }
});
router.delete('/delete/:id', (req, res) => {
    if (req.session.user) {
        let id = Number(req.session.user);
        query.delete_user(id)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                res.render('error', {
                    err
                })
            })
    } else {
        res.redirect('/login?e=unauthorized');
    }
});
module.exports = router;
