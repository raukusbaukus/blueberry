const express = require('express'),
    router = express.Router(),
    query = require('../queries');
//
router.get('/create/:event', (req, res) => {
    let event = Number(req.params.event);
    event ?
        //if user arrives at signup via event rsvp, save event id to sign them up
        //automagically, post registration
        res.render('create_user', {
            event
        }) :
        //if the user didn't arrive at sign up via event, pass events keyword
        //to usher them to search, post signup
        res.render('create_user', {
            events: 'events'
        })
});
router.post('/create', (req, res) => {
    let data = req.body;
    query.create_user(data)
        .then(user => {
            res.render('user', {
                user
            });
        })
        .catch(err => {
            res.status(400).send(err)
        })
        .finally(() => {
            query.end_connection();
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
        .finally(() => {
            query.end_connection();
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
        .finally(() => {
            query.end_connection();
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
        .finally(() => {
            query.end_connection();
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
        .finally(() => {
            query.end_connection();
        })
});
module.exports = router;
