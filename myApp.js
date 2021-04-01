var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));

console.log('Hello World');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
  if(process.env.MESSAGE_STYLE === 'uppercase'){
    res.json({"message": "HELLO JSON"});
  }
  else {
    res.json({"message": "Hello json"});
  }
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({"time": req.time});
});

app.get('/:word/echo', (req, res) => {
  const word = req.params.word;
  res.json({echo: word});
});

// app.get('/name', (req, res) => {
//   const { first, last } = req.query;
//   res.json({name: `${first} ${last}`});
// });

app.route('/name')
  .get((req, res) => {
    const { first, last } = req.query;
    res.json({name: `${first} ${last}`});
  })
  .post((req, res) => {
    const { first, last } = req.body;
    res.json({name: `${first} ${last}`});
  });

module.exports = app;
