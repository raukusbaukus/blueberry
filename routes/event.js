var express = require('express');
var router = express.Router();
var queries = require('../queries');

router.get('/:id', (req, res, next) => {
	let id = req.params.id;
	//res.send(id);
	console.log('it worked');
	queries.get_event_by_id(id)
            .then(tag_ids => {
              let tid = [];
              tag_ids.forEach(tag_id => {
                console.log("you're in!!!");
                let id_list = {
                  title: tag_id.title
                }
                tid.push(id_list);
              });
              res.send(tid);
          });
});







module.exports = router;
