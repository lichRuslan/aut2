let express = require('express');
let bodyParser = require('body-parser');

let app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
var arr = ['Hello', 'world', 'lol'];
app.get('/', function (req, res) {
  res.render('index', {arr: arr});
});
app.get('/create', function (req, res) {
  res.render('create');
});
app.post('/create', function (req, res) {
  console.log(req.body);
  arr.push(req.body.text);
  res.redirect('/');
});

module.exports = app;