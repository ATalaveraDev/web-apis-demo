var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(bodyParser.json());

app.post('/', (req, res) => {
  res.send('BEACON RESPONDING')
});

app.listen(3000, () => {
  console.log('Express is listening to http://localhost:3000');
});