const express = require('express'),
    router = express.Router();

router.post('/create', (req, res) => {
  res.send('hi');
})
module.exports = router;
