var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.use(require('body-parser').urlencoded({ extended: false }));//false
app.use(passport.initialize());
app.use(passport.session());
app.use(cors())

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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

function getDBString () {
	return 'mongodb://127.0.0.1:27017/netelixir'
  }
  function connect () {
	console.log('Connecting to netelixir employee database..')
	var dbString = getDBString()
	mongoose.connect(dbString, {useNewUrlParser: true})
  }

  function init () {
	console.log('connection to mongo successful')
  }
  connect()
  mongoose.connection.on('close', connect)
  mongoose.connection.on('error', console.error.bind(console, 'connection error:'))
  mongoose.connection.on('open', init)

module.exports = app;
