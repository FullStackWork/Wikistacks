const express = require('express');
const morgan = require('morgan');
const { db, Page, User } = require('./models');
//Routers
const wikiRouter = require('/Users/rohan/WikiStack/routes/wiki.js');
const userRouter = require('/Users/rohan/WikiStack/routes/user.js');

//Starting Express App
const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.static('/Users/rohan/WikiStack/stylesheets/style.css'));
app.use(express.urlencoded());

app.use('/wiki', wikiRouter );
app.use('/user', userRouter);

//Databas Auth
db.authenticate()
  .then(() => {
    console.log('connected to the database');
  })

//Syncing database--Putting tables in database
const init = async () => {
    // await Page.sync({ force: true });
    // await User.sync({ force: true });
    await db.sync({force: true});

  }
  
init();

//Server listening
app.get('/', function(req, res){
    res.send('Hello');
})

app.listen(3000, function(){
    console.log("Hello from the server");
})