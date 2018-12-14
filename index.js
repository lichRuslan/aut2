let config = require('./config');
let app = require('./app');
let database = require('./database');

database()
  .then(info => {
    console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
    //console.log(info.host, info.port, info.name);
    app.listen(config.PORT, ()=> {
      console.log(`Example app listening on port: ${config.PORT}`)
    });
}) 
.catch(()=> {
  console.error('Unable to connect to database');
  process.exit(1)
})