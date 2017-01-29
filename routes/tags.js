const express = require('express'),
  router = express.Router(),
  query = require('../queries');


router.post('/create', (req, res) => {
  let tag_title = String(req.body.tag);
  let user_id = Number(req.body.user_id);
  query.check_tag(tag_title)
    .then(tag_id => {
      if (tag_id.length < 1) {
        //new tag. create and associate to user.
        query.create_tag(tag_title, user_id)
          .then(new_tag_id => {
            query.associate_users_tags(new_tag_id, user_id);
          })
          .catch(err => {
            console.error(err);
            res.status(500).send(err);
          })
      } else {
        //existing tag. check for association to user
        query.check_tag_association(tag_id, user_id)
          .then(tag_assoc => {
            if (tag_assoc.length < 1) {
              //tag not associated to user, add association
              query.associate_users_tags(tag_id, user_id);
            }
          })
          .catch(err => {
            console.error(err);
            res.status(500).send(err);
          })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    })
})

router.get('/:tags', (req, res) => {
  let tags = String(req.params.tags);
  let tag_arr = tags.split('&');
  res.send(tag_arr);
});

module.exports = router;
