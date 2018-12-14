let express = require('express');
let bodyParser = require('body-parser');
let path = require('path');
let app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascripts', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/create', function (req, res) {
  res.render('create');
});

module.exports = app;