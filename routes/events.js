const express = require('express'),
    router = express.Router(),
    query = require('../queries');

router.get('/', (req, res) => {
    query.get_events()
        .then(events => {
            res.render('events', {
                events,
                me: {
                    id: 2
                }
            }) //this is a placeholder object definition
        })
        .catch(err => {
            console.error(err);
            res.status(400).send(err);
        })
        // .finally(() => {
            // query.end_connection();
        // })
});

module.exports = router;
