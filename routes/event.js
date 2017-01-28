const express = require('express'),
    router = express.Router(),
    query = require('../queries');

router.post('/create', (req, res, next) => { //take path from moh's form
    query.create_event(req.body); //is this how I grab the info?!
    // create_event(); //calling the function!
});
router.get('/read/:id', (req, res) => {
    let id = req.params.id;
    query.get_event_by_id(id)
        .then((db_event => {
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
                })
                .catch(err => {
                    console.error(err);
                })
        }))
})

//POST

//DELETE
router.delete('/delete/:id', (req, res, next) => {
    let event_to_delete = String(req.body.event.title);
    delete_event(event_to_delete);
});

//UPDATE
router.put('/update/:id', (req, res, next) => {
    let event_to_update = //grab the event to update
        knex(events).where(events, event_to_update).update(event_to_update).then((updated) => {
            console.log(updated);
        }).finally(function() {
            knex,
            destroy();
        })
});









module.exports = router;
