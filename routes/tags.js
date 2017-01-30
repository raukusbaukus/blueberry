const express = require('express'),
  router = express.Router(),
  query = require('../queries');


router.post('/create', (req, res) => {
  let tag_title = String(req.body.tag);
  let user_id = Number(req.body.user_id);
  query.check_tag(tag_title)
    .then(tag_id => {
      //tag_id = Number(tag_id);
      if (tag_id.length < 1) {
        //new tag. create and associate to user.
        query.create_tag(tag_title, user_id)
          .then(r_tag_id => {
            new_tag_id = Number(r_tag_id[0]);
            query.associate_users_tags(new_tag_id, user_id)
              .then(() => {
                res.status(200).send("new tag created");
              })
              .catch(err => {
                console.error("catch 1", err);
                res.status(500).send(err);
              })
          })
          .catch(err => {
            console.error("catch 2", err);
            res.status(500).send(err);
          })
      } else {
        //existing tag. get tag_id
        query.get_tag_id_by_tag_title(tag_title)
          .then(g_tag_id => {
            e_tag_id = Number(g_tag_id[0].id);
            //check for association to user
            query.check_tag_association(e_tag_id, user_id)
              .then(tag_assoc => {
                if (tag_assoc.length < 1) {
                  //tag not associated to user, add association
                  query.associate_users_tags(e_tag_id, user_id)
                    .then(() => {
                      res.status(200).send("added tag to user");
                    })
                    .catch(err => {
                      console.error("catch 3", err);
                      res.status(500).send(err);
                    })
                } else {
                  //tag already associated, do nothing
                  res.status(200).send("tag is associated");
                }
              })
              .catch(err => {
                console.error("catch 4", err);
                res.status(500).send(err);
              })
          })
          .catch(err => {
            console.error("catch 5", err);
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
  //deletes the passed tag from the passed user. does not delete from tags table
  let tag_name = String(req.body.tag_name);
  let user_id = Number(req.body.user_id);
  query.check_tag(tag_name)
    .then(tag_id => {
      q_tag_id = Number(tag_id[0].id);
      if (tag_id.length > 0) {
        //tag exists
        query.check_tag_association(q_tag_id, user_id)
          .then(assoc_results => {
            if (assoc_results.length > 0) {
              //tag is associated to user
              query.unassociate_tag(q_tag_id, user_id)
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
  query.tag_associations(user_id)
    .then(tag_data => {
      let tag_titles = [];
      tag_data.forEach(atag => {
        tag_titles.push(atag.title);
      });
      res.status(200).send(tag_titles);
    })
    .catch(err => {
      console.error("catch user", err);
      res.status(500).send(err);
    })
});

// router.get('/:tags', (req, res) => {
//   // let tags = String(req.params.tags);
//   // let tag_arr = tags.split('&');
//   // res.status(200).send(tag_arr);
// });

module.exports = router;
