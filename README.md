# Blueberry
An app for coordinating interest based user learning and teaching

##API
here is the object passed inside an array as the result of getting the `./` route
```js
event = {
  title: 'String Theory',
  location: {
    title: 'Galvanize',
    address: '1644 Platte St. Level 4',
    area: 'Denver, CO'
  },
  start: '2018-01-08 18:00:00',
  end: '2018-01-08 20:00:00',
  tags: ['Astronomy', 'Physics'],
  host: {
    avatar: 'https://en.wikipedia.org/wiki/Avatar_(computing)#/media/File:Avatar_girl_face.png',
    display_name: 'Anita Grung',
    rating: 4.9,
    xp: 147
  }
}
```

##Github feature branch guidelines:

You should always be working on a feature branch, not on master or staging.

whenever you start a new feature branch, do the following from the CLI to setup your branch:

git checkout -b feature_name
git push --set-upstream-to origin feature_name

after that, when you are pushing changes, just do:
=======
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
>>>>>>> 9f1fd5f5de9e44ee481fb529999ce2676d9af200
then, on github.com perform a pull request from feature_name branch to the staging branch

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
