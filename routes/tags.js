const express = require('express'),
    router = express.Router(),
    query = require('../queries');


router.post('/create', (req, res) => {
    let tag = String(req.body.tag);
    let user_id = Number(req.body.user_id);
    query.check_tag(tag)
        .then(real_tag => {
            console.log('real_tag.length ', real_tag.length);
            if (real_tag.length < 1) {
                //add tag to tags, users_tags, and users
                query.create_tag(tag, user_id)
                    .then(tag_id => {
                        query.add_tag_to_user(tag_id, user_id)
                            .then(data => {
                                res.status(200).json("tag was added");
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).send(err)
                            })
                            .finally(() => {
                                // query.end_connection();
                            })
                    })
            } else {
                //add tag to users and users_tags
                query.add_tag_to_user(real_tag.id, user_id)
                    .then(title => {
                        res.status(200).json("tag was added to user");
                    })
                    .catch(err => {
                        console.error(err);
                        res.status(500).send(err);
                    })
                    .finally(() => {
                        // query.end_connection();
                    })
            }
        })
        .catch(err => {
            console.error(err)
            res.status(500).send(err);
        })
        .finally(() => {
            // query.end_connection();
        })
});

router.get('/:tags', (req, res) => {
    let tags = String(req.params.tags);
    let tag_arr = tags.split('&');
    res.send(tag_arr);
});

module.exports = router;
