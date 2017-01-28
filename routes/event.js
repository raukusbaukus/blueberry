const express = require('express'),
    router = express.Router(),
    query = require('../queries');

//CREATE
router.get('/create/:user', (req, res) => {
    query.get_all_tags()
        .then(tags => {
            let me = {
                id: req.params.user
            }
            res.render('create_event', {
                me,
                tags
            })
        })
        .catch(err => {
            console.error(err);
            res.status(400).send(err);
        })
        .finally(() => {
            query.end_connection();
        })
})

router.post('/create', (req, res, next) => { //take path from moh's form
    query.create_event(req.body)
        .then(event => {
            query.add_tags_to_event(req.body.tags, event)
                .then(event => {
                    res.redirect('/');
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).send(err)
                })
                .finally(() => {
                    query.end_connection();
                })
        })
        .catch(err => {
            console.error(err);
            res.status(400).send(err)
        })
        .finally(() => {
            query.end_connection();
        })
});

//READ
router.get('/read/:id', (req, res) => {
    let id = req.params.id;
    query.get_event_by_id(id)
        .then(db_event => {
            let event = {
                title: db_event[0].title,
                description: db_event[0].description,
                skill_level: db_event[0].skill_level,
                capacity: db_event[0].capacity,
                location: {
                    title: db_event[0].venue,
                    address: db_event[0].address,
                    area: db_event[0].area
                },
                date: db_event[0].start.toLocaleDateString('en-us', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                }),
                start: db_event[0].start.toLocaleTimeString('en-us', {
                    hour: 'numeric',
                    minute: '2-digit'
                }),
                end: db_event[0].end.toLocaleTimeString('en-us', {
                    hour: 'numeric',
                    minute: '2-digit'
                }),
                host: {
                    id: db_event[0].user,
                    avatar: db_event[0].avatar ? db_event[0].avatar : '/img/users/anon.jpg',
                    display_name: db_event[0].display_name,
                    bio: db_event[0].bio,
                    rating: db_event[0].rating,
                    xp: db_event[0].xp ? db_event[0].xp : 'new'
                },
                tags: [],
                students: [],
                teachers: []
            }
            event.teachers.push(event.host);
            query.get_users_by_event(id)
                .then(db_users => {
                    db_users.forEach(user => {
                        user.role === 'student' ? event.students.push(user) : event.teachers.push(user);
                    })
                    event.vacancies = event.capacity - event.students.length;
                    query.get_tags_by_event(id)
                        .then(db_tags => {
                            db_tags.forEach(tag => {
                                event.tags.push(tag.title);
                            })
                            res.render('event', {
                                event
                            })
                        })
                        .catch(err => {
                            console.error(err);
                        })
                        .finally(() => {
                          query.end_connection();
                        })
                })
                .catch(err => {
                    console.error(err);
                })
                .finally(() => {
                    query.end_connection();
                })
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            query.end_connection();
        })
})

//UPDATE
router.get('/update/:id', (req, res) => {
    let id = Number(req.params.id);
    query.get_event_by_id(id)
        .then(event => {
            query.get_tags_by_event(event)
                .then(tags => {
                    query.get_users_by_event(event)
                        .then(users => {
                            res.render('update_user', {
                                event,
                                tags,
                                users
                            });
                        })
                        .catch(err => {
                            console.error(err);
                            res.status(400).send(err);
                        })
                        .finally(() => {
                            query.end_connection();
                        })
                })
                .catch(err => {
                    console.error(err);
                    res.status(400).send(err);
                })
                .finally(() => {
                    query.end_connection();
                })
        })
        .catch(err => {
            console.error(err);
            res.status(400).send(err);
        })
        .finally(() => {
            query.end_connection();
        })
})

router.put('/update', (req, res) => {
    let id = Number(req.body.id);
    query.update_event(id)
        .then(id => {
            res.redirect(`/event/update/${id}`);
        })
        .catch(err => {
            console.error(err);
            res.status(400).send(err)
        })
        .finally(() => {
            query.end_connection();
        })
});

//DELETE
router.delete('/delete/:id', (req, res, next) => {
    let id = Number(req.params.id);
    query.delete_event(id)
        .then(event => {
            res.redirect('/events');
        })
        .catch(err => {
            console.error(err);
        })
        .finally(() => {
            query.end_connection();
        })
});

module.exports = router;
