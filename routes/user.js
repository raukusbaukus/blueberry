const express = require('express'),
    router = express.Router(),
    argon2 = require('argon2'),
    query = require('../queries');
//
router.get('/create/', (req, res) => {
    res.render('create_user');
});
router.get('/create/:event', (req, res) => {
    let event = Number(req.params.event);
    //if user arrives at signup via event rsvp, save event id to sign them up
    //automagically, post registration
    res.render('create_user', {
        event
    })
});
router.post('/create', (req, res) => {
    argon2.generateSalt(16).then(salt => {
            argon2.hash(req.body.password, salt)
                .then(hash => {
                    req.body.password = hash;

                    query.create_user(req.body)
                        .then(me => {
                            //previous promise returns an array
                            me = me[0];
                            res.render('user', {
                                me
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(400).send(err)
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
});
router.get('/read/:id', (req, res) => {
    query.find_user(id)
        .then(user => {
            res.render('read_user', {
                user
            });
        })
        .catch(err => {
            res.status(400).send(err)
        })
});
router.get('/update/:id', (req, res) => {
    query.find_user(id)
        .then(user => {
            res.render('update_user', {
                user
            });
        })
        .catch(err => {
            res.status(400).send(err)
        })
})
router.put('/update/:id', (req, res) => {
    let id = Number(req.params.id);
    query.update_user(id)
        .then(user => {
            res.redirect(`/user/read/${id}`);
        })
        .catch(err => {
            res.status(400).send(err)
        })
});
router.delete('/delete/:id', (req, res) => {
    let id = Number(req.params.id);
    query.delete_user(id)
        .then(() => {
            res.redirect('/')
        })
        .catch(err => {
            res.status(400).send(err)
        })
});
module.exports = router;
