var express = require('express');
var router = express.Router();
var queries = require('../queries');
var knex = require("knex")(knexConfig);

router.get('/:id', (req, res, next) => {
	let id = req.params.id;
	queries.get_event_by_id(id)
            .then(tag_ids => {
              let tid = [];
              tag_ids.forEach(tag_id => {
                let id_list = {
                  title: tag_id.title,
                }
                tid.push(id_list);
              });
              res.send(tid);
          });
});

router.get('/more/:event', (req, res, next) => { //change 'more' to another name
	console.log('inside event.js');
	let event = req.params.event;
	queries.get_tags_by_event(event)
            .then(event_tag => {
              let lotags = [];
              event_tag.forEach(event_tag => {
                let tag_list = {
                  title: event_tag.title,
                }
                lotags.push(tag_list);
              });
              res.send(lotags);
          });
});

//POST
router.post('/post', (req, res, next) => { //take path from moh's form
  let event = String(req.body.event.title); //is this how I grab the info?!
  create_event(event); //calling the function!
});

//DELETE
router.delete('/delete', (req, res, next) => {
  let event_to_delete = String(req.body.event.title);
  delete_event(event_to_delete);
});

//UPDATE
router.put('/update', (req, res, next) => {
  let event_to_update = //grab the event to update
  knex(events).where(events, event_to_update).update(event_to_update).then((updated) => {
    console.log(updated);
  }).finally(function () {
    knex,destroy();
  }) 

});


















module.exports = router;
