var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
require('dotenv').config();
const connectionString = process.env.MONGO_CON
var mongoose = require('mongoose');
mongoose.connect(connectionString,{useNewUrlParser: true,useUnifiedTopology: true});
var Student = require('./models/student');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var stuRouter = require('./routes/student');
var boardRouter = require('./routes/board');
var selRouter = require('./routes/selector');
var resourceRouter = require('./routes/resource');

var app = express();


passport.use(new LocalStrategy(function(username, password, done) {
  Account.findOne({ username: username }, function (err, user) {
  if (err) { return done(err); }
  if (!user) {
    return done(null, false, { message: 'Incorrect username.' });
  }
  if (!user.validPassword(password)) {
    return done(null, false, { message: 'Incorrect password.' });
  }
    return done(null, user);
  });
}));

app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


// passport config
// Use the existing connection
// The Account model
var Account =require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

  

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/student', stuRouter);
app.use('/board', boardRouter);
app.use('/selector', selRouter);
app.use('/resource', resourceRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once("open", function(){
console.log("Connection to DB succeeded")
});

// We can seed the collection if needed on server start
async function recreateDB(){
 // Delete everything
 await Student.deleteMany();
 let instance1 = new Student({Name:"Shanmuk", SId:10, Email:'test@gmail.com'});
 instance1.save().then((res)=>{
  console.log(res);
  console.log('saved to DB');
 }).catch((err)=>{
  console.log('error while saving to db '+err);
 })

 let instance2 = new Student({Name:"Vamshi", SId:11, Email:'vamshi@test.com'});
 instance2.save().then((res)=>{
  console.log(res);
  console.log('saved to DB');
 }).catch((err)=>{
  console.log('error while saving to db '+err);
 })

 let instance3 = new Student({Name:"Narendra", SId:12, Email:'narendra@test.com'});
 instance3.save().then((res)=>{
  console.log(res);
  console.log('saved to DB');
 }).catch((err)=>{
  console.log('error while saving to db '+err);
 })
}

let reseed = true;
if (reseed) { recreateDB();}

module.exports = app;
