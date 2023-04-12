var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
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
 let instance1 = new Student({Name:"Shanmuk", SId:12345, Email:'test@gmail.com'});
 instance1.save().then((res)=>{
  console.log(res);
  console.log('saved to DB');
 }).catch((err)=>{
  console.log('error while saving to db '+err);
 })

 let instance2 = new Student({Name:"Vamshi", SId:560729, Email:'vamshi@test.com'});
 instance2.save().then((res)=>{
  console.log(res);
  console.log('saved to DB');
 }).catch((err)=>{
  console.log('error while saving to db '+err);
 })

 let instance3 = new Student({Name:"Narendra", SId:560823, Email:'narendra@test.com'});
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
