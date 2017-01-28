const express = require('express'),
    router = express.Router();


router.get('/create', (req, res) => {
  res.render('create_user');
})
module.exports = router;
