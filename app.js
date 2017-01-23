const express = require('express');
const app = express();
var config = require('./db/knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);
var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// set the view engine to ejs
app.set('view engine', 'ejs');

const arg = process.argv[2] ? Number(process.argv[2]) : 8081;

app.listen(arg, function() {
  console.log('Listening on port ' + arg);
});

app.get('/', (req, res) => {
  knex.select('*').from('events').then((payload) => {
    if (payload.length > 0) {
      res.status(200).send(payload); //JSON.stringify(payload));
    } else {
      res.status(404).send('No events found.');
    }
  });
});

app.get('/landing', (req, res) => {

	// var html = new EJS({url: 'index.ejs'}).render();
	res.render('../views/index.ejs', {test: 'blabla'});
	console.log("Hello!");

  // knex.select('*').from('events').then((payload) => {
  //   if (payload.length > 0) {
  //     res.status(200).send(payload); //JSON.stringify(payload));
  //   } else {
  //     res.status(404).send('No events found.');
  //   }
  // });
});