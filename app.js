require("dotenv").config()
var createError = require('http-errors');
var cors = require('cors')
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
const tasksRouter = require('./routes/tasks/tasksRouter')
const usersRouter = require('./routes/users/usersRouter')
const { connectToDatabase } = require('./config/database')

// Initialize database connection - don't await here to avoid blocking
connectToDatabase().catch(console.error)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
// Cors for local testing
// app.use(cors({
//   credentials: true,
//   origin: 'http://localhost:3030',
// }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api', indexRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/users', usersRouter)

// Root route to show HTML with favicon
app.get('/', function(req, res) {
  res.render('index', { title: 'React Ticket Backend' });
});

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

module.exports = app;
