
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: (1000*60*60*24*14) //this is 14 days
    }
}))

// massive(config.connection)
// .then( db => {
//   app.set('db', db);
// })

app.use(express.static(__dirname + './../build'))

var boggle = require("./boggle.js");

//////////Endpoints for the front end

app.post('/api/getWords', function(req, res, next){
  let board = req.body;
  console.log(board);
  let words = boggle.findWords(board);
  return res.status(200).send(words);
})



app.listen(config.port, console.log("you are now connected on " + config.port));
