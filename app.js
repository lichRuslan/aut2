/* eslint-disable */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const staticAsset = require('static-asset');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const config = require('./config');
// const mocks = require('./mocks');// фейковые данные (лень заполнять данные)
//database
mongoose.Promise= global.Promise;
        mongoose.set('debug', config.IS_PRODICTION);

        mongoose.connection
        .on('error', error => console.log(error))
        .on('close', () => console.log('Database connection closed.'))
        .once('open', () => {
          const info = mongoose.connections[0];
          console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
          require('./mocks')();
        });
        mongoose.connect(config.MONGO_URL, {useMongoClient: true});
//express
let app = express();

// sessions
// app.use(
//   session({
//     secret : config.SESSION_SECRET, // крипт (нужно разобратся !!!!!)
//     resave : true,
//     saveUninitialized : false,
//     store: new MongoStore({
//       mongoConnection : mongoose.connection
//     })
//   })
// );
app.use(
  session({ 
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.set('view engine', 'ejs');
//sets and users
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(staticAsset(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascripts', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

// routes
const routes = require('./routes');
app.use('/', routes.archive);
app.use('/api/auth', routes.auth);
app.use('/post', routes.post);
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