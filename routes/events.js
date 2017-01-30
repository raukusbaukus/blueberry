const express = require('express'),
  router = express.Router(),
  query = require('../queries');


router.get('/', (req, res, next) => {
  if (req.session.user) {
    query.get_events()
      .then(values => {
        let events = [];
        query.get_all_tags()
          .then(all_tag_titles => {
            let all_tags = [];
            all_tag_titles.forEach(a_tags => {
              let all_tag = {
                title: a_tags.title
              }
              all_tags.push(all_tag);
            });
            query.get_tags()
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
                    date: value.start.toLocaleDateString('en-us', {
                      month: 'numeric',
                      day: '2-digit'
                    }),
                    start: value.start.toLocaleTimeString('en-us', {
                      hour: 'numeric',
                      minute: '2-digit'
                    }),
                    end: value.end.toLocaleTimeString('en-us', {
                      hour: 'numeric',
                      minute: '2-digit'
                    }),
                    tags: [],
                    host: {
                      id: value.user,
                      avatar: value.avatar ? value.avatar : '/img/users/anon.jpg',
                      display_name: value.display_name,
                      bio: value.bio,
                      rating: value.rating,
                      xp: value.xp ? value.xp : 'new'
                    },
                    description: value.description,
                    skill_level: value.skill_level,
                    capacity: value.capacity
                  }
                  let filtered_tags = tags.filter(tag => tag.event === event.id);
                  filtered_tags.forEach(tag => event.tags.push(tag.title));
                  events.push(event);
                });
                res.render('events', {
                  events,
                  all_tags,
                  me: {
                    id: req.session.user
                  }
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
      })
      .catch(err => {
        console.error(err)
        res.status(500).send(err);
      });
  } else {
    res.redirect('/login?e=restricted');
    //redirect to login
  }
});

router.get('/search', (req, res) => {
  res.render('login');
  if (req.session.user) {

    console.log('in search route ', req.query);
    let search_data = req.query; //array of numbers or false
    query.get_all_tags()
      .then(all_tag_titles => {
        let all_tags = [];
        all_tag_titles.forEach(a_tags => {
          let all_tag = {
            title: a_tags.title
          }
          all_tags.push(all_tag);
        })
        query.get_events_by_tags(search_data)
          .then(events => {
            console.log('in return ', events);
            res.render('events', {
              events,
              all_tags,
              me: {
                id: req.session.user
              }
            });
            //res render search results
          })
      })
      .catch(err => {
        console.error(err)
        res.status(500).send(err);
      });
  } else {
    res.redirect('/login?e=restricted');
  }
});
///
module.exports = router;
