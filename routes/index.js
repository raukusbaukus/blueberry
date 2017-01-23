const express = require('express'),
    router = express.Router(),
    queries = require('../queries');

router.get('/', (req, res, next) => {
    queries.get_events()
    .then(values => {
      let events = JSON.stringify(values);
      res.status(200).send('hey!' + events);
    }).catch(err => {
        console.error(err)
        res.status(400).send('hey!' + err);
    })
});

module.exports = router;
