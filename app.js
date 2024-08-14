const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const getFullPath = require('./app/utils/string')


const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const traverseDirectory = getFullPath(__dirname + '/routes/');

for (const fullPath of traverseDirectory) {
  app.use('/', require(fullPath));
}


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

app.use((error, req, res, next) => {
  if (typeof error.handle === 'function') {
    error.handle();
  }
  const code = error.code || 500

  if (code === 500) {
    error.stack += ` [Path: ${req.path}]`;
    console.error(error);
  }

  res.status(code).json({
    code,
    message: code !== 500 ? error.message : 'Something went wrong!',
  });
});


module.exports = app;
