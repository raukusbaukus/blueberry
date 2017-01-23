const express = require('express'),
    router = express.Router(),
    queries = require('../queries');

router.get('/', (req, res, next) => {
    queries.get_events()
        .then(values => {
            let events = [];
            values.forEach(value => {
                let event = {
                    title: value.title,
                    location: {
                        title: value.venue,
                        address: value.address,
                        area: value.area
                    },
                    start: value.start,
                    end: value.end,
                    tags: value.tag,
                    host: {
                        avatar: value.avatar,
                        display_name: value.display_name,
                        bio: value.bio,
                        rating: value.rating,
                        xp: value.xp,
                    },
                    description: value.description,
                    skill_level: value.skill_level
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
