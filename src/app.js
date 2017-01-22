const express = require('express');
const app = express();
var config = require('../db/knexfile.js');
var env = 'development';
var knex = require('knex')(config[env]);

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
