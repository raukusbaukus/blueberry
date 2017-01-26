const express = require('express'),
    router = express.Router(),
    query = require('../queries');

    router.get('/:tags', (req, res) => {
      console.log('hi');
      res.send('hi');
    })

module.exports = router;
