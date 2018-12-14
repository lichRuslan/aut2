let express = require('express');
let bodyParser = require('body-parser');
let Post = require('./models/post');
let path = require('path');
let app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));


// var arr = ['Hello', 'world', 'lol'];
app.get('/', function (req, res) {
  Post.find({}).then(posts => {
    res.render('index', {posts: posts});
  });
  //res.render('index', {arr: arr});
});
app.get('/create', function (req, res) {
  res.render('create');
});
app.post('/create', function (req, res) {
  console.log(req.body);
  var {title, body} = req.body;
  Post.create({
    title: title,
    body:body
  }).then(post => console.log(post.id));

  res.redirect('/');
});

module.exports = app;