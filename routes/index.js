const express = require('express'),
  router = express.Router(),
  queries = require('../queries');

router.get('/', (req, res, next) => {
  queries.get_events()
    .then(values => {
      let events = [];
      queries.get_tags()
        .then(tag_values => {
          let tags = [];
          tag_values.forEach(tag_value => {
            let tag = {
              title: tag_value.title,
              event: tag_value.event
            }
            tags.push(tag);
          });
          values.forEach(value => {
            let event = {
              id: value.id,
              title: value.title,
              location: {
                title: value.venue,
                address: value.address,
                area: value.area
              },
              date: value.start.toLocaleDateString('en-us', {month: 'numeric', day: '2-digit'}),
              start: value.start.toLocaleTimeString('en-us', {hour: 'numeric', minute: '2-digit'}),
              end: value.end.toLocaleTimeString('en-us', {hour: 'numeric', minute: '2-digit'}),
              tags: [],
              host: {
                avatar: value.avatar,
                display_name: value.display_name,
                bio: value.bio,
                rating: value.rating,
                xp: value.xp,
              },
              description: value.description,
              skill_level: value.skill_level,
              capacity: value.capacity
            }
            let filtered_tags = tags.filter(tag => tag.event === event.id);
            filtered_tags.forEach(tag => event.tags.push(tag.title));
            events.push(event);
          });
          res.render('index', {
            events,
            tags
          });
        })
        .catch(err => {
          console.error(err)
          res.status(500).send(err);
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send(err);
    });
});

module.exports = router;
