const express = require('express'),
    router = express.Router(),
    queries = require('../queries');

router.post('/', (req, res) => {
    console.log(req);
    res.redirect('/users/' + req.user.username);
});
