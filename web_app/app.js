var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
const jobStatus = require('./lib/jobStatus');
var index = require('./routes/index');

// Express View Engine Setup
// -----------------------------
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Middleware - Session Tracking
// -----------------------------
/* Session Middleware to track browser sessions
  HTTP REQUEST Cookie:connect.sid=s%3ASWc6lrOHrx2Sb6uI2fW4YXjnA2rBr6rQ.iDs0LBsnuDUuBEA7k%2BVShsJyRJ4QVXmRv658Dg75W9o
*/
app.use(session({
  secret: 'fsdfsdf324nn234bm', //client cookie's encryption key - DO NOT CHANGE - READ ONLY
  resave: false,
  saveUninitialized: true
  // store: new MongoStore({
  //   db: 'sessions',
  //   mongooseConnection: mongoose.connections[0]
  // })
}));

// Middleware - Job Status Check
// -----------------------------
// app.use((req,res,next)=>{
//   req.session.progress = jobStatus.progress;
//   console.log('checking session..', jobStatus.progress);
//   if(jobStatus.progress === 100){
//     req.session.inProgress = false;
//   }
//   next(); //continue
// });

// Middleware - Parsers
// -----------------------------
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// Middleware - 404 Handler
// -----------------------------
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Middleware - Error Printer
// -----------------------------
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
