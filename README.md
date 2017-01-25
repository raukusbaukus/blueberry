# Blueberry
####Learn From Each Other
blueberry makes it easy for users to coordinate learning from each other, whether on opposite sides of the world or at the local cafe.

##API
here is the object passed inside an array as the result of getting the `./` route
```js
event = {
  title: 'String Theory',                     //event.title
  location: {
    title: 'Galvanize',                       //event.location.title
    address: '1644 Platte St. Level 4',       //event.location.address
    area: 'Denver, CO'                        //event.location.area
  },
  date: '1/08',                               //event.date
  start: '6:00pm',                            //event.start
  end: '8:00pm',                              //event.end
  tags: ['Astronomy', 'Physics'],             //event.tags
  host: {
    avatar: 'http://tinyurl.com/jgb86vs',      //event.host.avatar
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

####Events Page
```js
event = {
  title: 'Intro to Node',                     //event.title
  location: {
    title: 'Galvanize',                       //event.location.title
    address: '1644 Platte St. Level 4',       //event.location.address
    area: 'Denver, CO'                        //event.location.area
  },
  date: '1/08',                               //event.date
  start: '6:00pm',                            //event.start
  end: '8:00pm',                              //event.end
  tags: ['Node', 'JavaScript'],               //event.tags
  host: {
    avatar: 'http://tinyurl.com/jgb86vs',     //event.host.avatar
    display_name: 'Anita Grung',              //event.host.display_name
    bio: 'OMG I am so awesome at everything', //event.host.bio
    rating: 4.9,                              //event.host.rating
    xp: 147                                   //event.host.xp
  },
  teachers: [                                 //event.teachers
    {
    display_name: 'Kyle Coberly',             //event.teachers[0].display_name
    avatar: '/img/users/67/kyle.jpg',         //event.teachers[0].avatar
    rating: 4.7,                              //event.teachers[0].rating
    xp: 138                                   //event.teachers[0].xp
  },
  {
    display_name: 'Sarah Healey',             //event.teachers[1].display_name  
    avatar: '/img/users/5/sarah.jpg',         //event.teachers[1].avatar
    rating: 5.0,                              //event.teachers[1].rating
    xp: 3                                     //event.teachers[1].xp      
  }
],
students: [                                   //event.students
  {
    display_name: 'Benjamin Matson',          //event.students[0].display_name
    avatar: '/img/users/67/ben.jpg',          //event.students[0].avatar
    rating: 4.9,                              //event.students[0].rating
  },                          
  {
    display_name: 'Mohamed Abdulsalam',       //event.students[1].display_name
    avatar: '/img/users/12/mo.jpg',           //event.students[1].avatar  
    rating: 5.0,                              //event.students[1].rating   
  },
  {
    display_name: 'Juan Ignacio Verni',       //event.students[2].display_name          
    avatar: '/img/users/6/juan.jpg',          //event.students[2].avatar          
    rating: 4.9,                              //event.students[2].rating        
  },
  {
    display_name: 'Tara Mason',               //event.students[3].display_name          
    avatar: '/img/users/7/tara.jpg',          //event.students[3].avatar            
    rating: 4.9,                              //event.students[3].rating    
  }  
],
  description: 'We will look at Node Docs',   //event.description
  skill_level: 'beginner',                    //event.skill_level
  capacity: 100                               //event.capacity
}
```
##Github feature branch guidelines:

You should always be working on a feature branch, not on master or staging.

whenever you start a new feature branch, do the following from the CLI to setup your branch:


```
git checkout -b [feature_name]
git push --set-upstream-to origin feature_name
```

after that, when you are pushing changes, just do:
```
git add .
git status
git commit -m '[commit message]'
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
git branch --set-upstream-to origin [feature_name]
cd db
knex migrate:latest
knex seed:run
```
