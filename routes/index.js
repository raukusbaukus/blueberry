const express = require('express'),
    router = express.Router(),
    queries = require('../queries');

router.get('/', (req, res, next) => {
    queries.get_events()
        .then(values => {
            let events = [];
            values.forEach(value => {
                let event = {
                    id: value.id,
                    title: value.title,
                    location: {
                        title: value.venue,
                        address: value.address,
                        area: value.area
                    },
                    date: value.start.toLocaleDateString('en-us', {month: 'numeric', day: '2-digit'}),
                    start: value.start.toLocaleDateString('en-us', {hour: 'numeric', minute: '2-digit'}),
                    end: value.end.toLocaleDateString('en-us', {hour: 'numeric', minute: '2-digit'}),
                    tags: [],
                    host: {
                        avatar: value.avatar,
                        display_name: value.display_name,
                        bio: value.bio,
                        rating: value.rating,
                        xp: value.xp,
                    },
                    description: value.description,
                    skill_level: value.skill_level,
                    capacity: value.capacity
                }
                events.push(event);
            });
            console.log(events);
            res.render('index', {events: events});
        }).catch(err => {
            console.error(err)
            res.status(400).send('hey!' + err);
        })
});

module.exports = router;
