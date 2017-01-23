# Blueberry
An app for coordinating interest based user learning and teaching

##API
here is the object passed inside an array as the result of getting the `./` route
```js
event = {
  title: 'String Theory',                     //event.title
  location: {
    venue: 'Galvanize',                       //event.location.venue
    address: '1644 Platte St. Level 4',       //event.location.address
    area: 'Denver, CO'                        //event.location.area
  },
  start: '2018-01-08 18:00:00',               //event.start
  end: '2018-01-08 20:00:00',                 //event.end
  tags: ['Astronomy', 'Physics'],             //event.tags
  host: {
    avatar: 'http://tinyurl.com/jgb86vs'        //event.host.avatar
    display_name: 'Anita Grung',              //event.host.display_name
    bio: 'OMG I am so awesome at everything', //event.host.bio
    rating: 4.9,                              //event.host.rating
    xp: 147                                   //event.host.xp
  },
  description: 'Intro to Multiverse',         //event.description
  skill_level: 'beginner',                    //event.skill_level
  capacity: 100                               //event.capacity
}
```

##Github feature branch guidelines:

You should always be working on a feature branch, not on master or staging.

whenever you start a new feature branch, do the following from the CLI to setup your branch:

git checkout -b feature_name
git push --set-upstream-to origin feature_name

after that, when you are pushing changes, just do:

```
git checkout -b feature_name
git push --set-upstream-to origin feature_name
```

after that, when you are pushing changes, just do:
```
git add .
git status
git commit -m 'commit message'
git push
```

we only merge from staging into master in preparation to deploy

##Keeping your database up-to-date:

When you need your current local branch updated with a new version of the database on staging, follow these steps:

From the CLI, be in the root /blueberry directory and do:

```
dropdb blueberry;
createdb blueberry;
git branch --set-upstream-to origin staging
git pull
git branch --set-upstream-to origin feature_name
cd db
knex migrate:latest
knex seed:run
```
