const express = require('express'),
    router = express.Router(),
    query = require('../queries');

router.get('/', (req, res, next) => {
    if (req.session.user) {
        res.redirect('/events');
    } else {
        query.get_events()
            .then(values => {
                let events = [];
                query.get_all_tags()
                    .then(all_tag_titles => {
                        let all_tags = [];
                        all_tag_titles.forEach(a_tags => {
                            let all_tag = {
                                title: a_tags.title,
                                id: a_tags.id
                            }
                            all_tags.push(all_tag);
                        });
                        query.get_tags()
                            .then(tag_values => {
                                let tags = [];
                                tag_values.forEach(tag_value => {
                                    let tag = {
                                        title: tag_value.title,
                                        event: tag_value.event
                                    }
                                    tags.push(tag);
                                });
                                values.forEach(value => {
                                    let event = {
                                        id: value.id,
                                        title: value.title,
                                        location: {
                                            title: value.venue,
                                            address: value.address,
                                            area: value.area
                                        },
                                        date: value.start.toLocaleDateString('en-us', {
                                            month: 'numeric',
                                            day: '2-digit'
                                        }),
                                        start: value.start.toLocaleTimeString('en-us', {
                                            hour: 'numeric',
                                            minute: '2-digit'
                                        }),
                                        end: value.end.toLocaleTimeString('en-us', {
                                            hour: 'numeric',
                                            minute: '2-digit'
                                        }),
                                        tags: [],
                                        host: {
                                            id: value.user,
                                            avatar: value.avatar ? value.avatar : '/img/users/anon.jpg',
                                            display_name: value.display_name,
                                            bio: value.bio,
                                            rating: value.rating,
                                            xp: value.xp ? value.xp : 'new'
                                        },
                                        description: value.description,
                                        skill_level: value.skill_level,
                                        capacity: value.capacity
                                    }
                                    let filtered_tags = tags.filter(tag => tag.event === event.id);
                                    filtered_tags.forEach(tag => event.tags.push(tag.title));
                                    events.push(event);
                                });
                                res.render('index', {
                                    events,
                                    all_tags
                                });
                            })
                            .catch(err => {
                                console.error(err)
                                res.render('error', {
                                    err
                                });
                            })
                    })
                    .catch(err => {
                        console.error(err)
                        res.render('error', {
                            err
                        });
                    });
            })
            .catch(err => {
                console.error(err)
                res.render('error', {
                    err
                });
            });
    }
});
router.post('/', (req, res) => {
  console.log('server entry', req.body.tags)
    query.get_events_by_tags([req.body.tags])
        .then(values => {
            let events = [];
            query.get_all_tags()
                .then(all_tag_titles => {
                    let all_tags = [];
                    all_tag_titles.forEach(a_tags => {
                        let all_tag = {
                            title: a_tags.title,
                            id: a_tags.id
                        }
                        all_tags.push(all_tag);
                    });
                    query.get_tags()
                        .then(tag_values => {
                            let tags = [];
                            tag_values.forEach(tag_value => {
                                let tag = {
                                    title: tag_value.title,
                                    event: tag_value.event
                                }
                                tags.push(tag);
                            });
                            values.forEach(value => {
                                let event = {
                                    id: value.id,
                                    title: value.title,
                                    location: {
                                        title: value.venue,
                                        address: value.address,
                                        area: value.area
                                    },
                                    date: value.start.toLocaleDateString('en-us', {
                                        month: 'numeric',
                                        day: '2-digit'
                                    }),
                                    start: value.start.toLocaleTimeString('en-us', {
                                        hour: 'numeric',
                                        minute: '2-digit'
                                    }),
                                    end: value.end.toLocaleTimeString('en-us', {
                                        hour: 'numeric',
                                        minute: '2-digit'
                                    }),
                                    tags: [],
                                    host: {
                                        id: value.user,
                                        avatar: value.avatar ? value.avatar : '/img/users/anon.jpg',
                                        display_name: value.display_name,
                                        bio: value.bio,
                                        rating: value.rating,
                                        xp: value.xp ? value.xp : 'new'
                                    },
                                    description: value.description,
                                    skill_level: value.skill_level,
                                    capacity: value.capacity
                                }
                                let filtered_tags = tags.filter(tag => tag.event === event.id);
                                filtered_tags.forEach(tag => event.tags.push(tag.title));
                                events.push(event);
                            });
                            res.render('index', {
                                events,
                                all_tags
                            });
                        })
                        .catch(err => {
                            console.error(err)
                            res.render('error', {
                                err
                            });
                        })
                })
                .catch(err => {
                    console.error(err)
                    res.render('error', {
                        err
                    });
                });
        })
        .catch(err => {
            console.error(err)
            res.render('error', {
                err
            });
        });
});
module.exports = router;
