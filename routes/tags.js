const express = require('express'),
  router = express.Router(),
  query = require('../queries');


router.post('/create', (req, res) => {
  let tag_title = String(req.body.tag);
  let user_id = Number(req.body.user_id);
  console.log("in /create");
  query.check_tag(tag_title)
    .then(tag_id => {
      //tag_id = Number(tag_id);
      if (tag_id.length < 1) {
        //new tag. create and associate to user.
        query.create_tag(tag_title, user_id)
          .then(new_tag_id => {
            query.associate_users_tags(new_tag_id, user_id)
              .then(() => {
                res.status(200).send("new tag created");
              })
              .catch(err => {
                console.error(err);
                res.status(500).send(err);
              })
          })
          .catch(err => {
            console.error(err);
            res.status(500).send(err);
          })
      } else {
        //existing tag. get tag_id
        query.get_tag_id_by_tag_title(tag_title)
          .then(tag_id => {
            //check for association to user
            query.check_tag_association(tag_id, user_id)
              .then(tag_assoc => {
                console.log("assoc is ", tag_assoc);
                if (tag_assoc.length < 1) {
                  //tag not associated to user, add association
                  query.associate_users_tags(tag_id, user_id)
                    .then(() => {
                      res.status(200).send("added tag to user");
                    })
                    .catch(err => {
                      console.error(err);
                      res.status(500).send(err);
                    })
                } else {
                  //tag already associated, do nothing
                  res.status(200).send("tag is associated");
                }
              })
              .catch(err => {
                console.error(err);
                res.status(500).send(err);
              })
          })
          .catch(err => {
            console.error("fourth ", err);
            res.status(500).send(err);
          })
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send(err);
    })
})

router.delete('/delete', (req, res) => {
  let tag_name = Number(req.params.tag_name);
  let user_id = Number(req.params.user_id);
  query.check_tag(tag_name)
    .then(tag_id => {
      if (tag_id.length > 0) {
        //tag exists
        query.check_tag_association(tag_id, user_id)
          .then(assoc_results => {
            if (assoc_results.length > 0) {
              //tag is associated to user
              query.unassociate_tag(tag_id, user_id)
                .then(() => {
                  res.status(200).send("tag association removed");
                })
                .catch(err => {
                  console.error(err);
                  res.status(500).send(err);
                })
            } else {
              res.status(200).send("tag wasn't associated");
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
});

router.get('/user/:user_id', (req, res) => {
  let user_id = Number(req.params.user_id);
  return query.tag_associations(user_id);
});

router.get('/:tags', (req, res) => {
  let tags = String(req.params.tags);
  let tag_arr = tags.split('&');
  res.send(tag_arr);
});

module.exports = router;
