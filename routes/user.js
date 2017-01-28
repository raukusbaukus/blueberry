const express = require('express'),
    router = express.Router();
    query = require('../queries');

router.post('/create', (req, res) => {
    query.create_user();
    res.render('events', me)
})
router.get('/create', (req, res) => {
    res.render('create_user');
})
module.exports = router;
