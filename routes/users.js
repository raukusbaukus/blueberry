var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  if(req.session){
    let me = {id:req.session.cookie.user}
  res.send('respond with a resource');
}else {
  res.redirect('/login?e=restricted')
}
});
/* Sign-up form */
router.get('/users', (req, res, next) => {
  if(req.session){
    let me = {id:req.session.cookie.user}
  res.redirect('/events');
}else {
  res.redirect('/login?e=restricted')
}
});
/*Sign-in*/
router.put('/users', (req, res, next) => {
  if(req.session){
    let me = {id:req.session.cookie.user}
  res.redirect('/events');

}else {
  res.redirect('/login?e=restricted')
}
});

module.exports = router;
