var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
/* Sign-up form */
router.get('/users', function(req, res, next) {
  res.redirect('/event');
});
/*Sign-in*/
router.put('/users', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
