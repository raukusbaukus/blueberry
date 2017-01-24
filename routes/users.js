var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
/* Sign-up form */
router.get('/users', (req, res, next) => {
  res.redirect('/events');
});
/*Sign-in*/
router.put('/users', (req, res, next) => {
  res.redirect('/events');
});

module.exports = router;
