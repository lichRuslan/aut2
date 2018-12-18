const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const config = require('./config');
//database
mongoose.Promise= global.Promise;
        mongoose.set('debug', config.IS_PRODICTION);

        mongoose.connection
        .on('error', error => console.log(error))
        .on('close', () => console.log('Database connection closed.'))
        .once('open', () => {
          const info = mongoose.connections[0];
          console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
        });
        mongoose.connect(config.MONGO_URL, {useMongoClient: true});
//express
let app = express();
app.set('view engine', 'ejs');
//sets and users
app.use(bodyParser.urlencoded({extended: true}));
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascripts', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

//routers
app.get('/', function (req, res) {
  res.render('index');
});

//error 404 ...
app.use((req, res, next)=> {
  let err  = new Error('Not Found');
  err.status = 404;
  next(err);
});
// all error 
app.use ((error, req, res, next)=> {
  res.status (error.status || 500);
  res.render('error', {
    message : error.message,
    error : !config.IS_PRODICTION ? error : {},
    title : 'Sorry we have a problem',
  });
})

app.listen(config.PORT, ()=> {
  console.log(`Example app listening on port: ${config.PORT}`)
});