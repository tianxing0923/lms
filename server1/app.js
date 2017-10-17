var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var moment = require('moment');
// var fs = require('fs');

var signin = require('./routes/signin');
var index = require('./routes/index');
var admin = require('./routes/admin');
var templates = require('./routes/templates');
var api = require('./routes/api');
// var users = require('./routes/users');

// var models = path.join(__dirname, 'models');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.moment = moment;

// Bootstrap models
// fs.readdirSync(models)
//   .filter(file => ~file.search(/^[^\.].*\.js$/))
//   .forEach(file => require(path.join(models, file)));

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/node_modules', express.static(path.join(__dirname, '../node_modules')));

// 登录
app.use('/signin', signin);

// 后台管理
app.use('/admin', admin);
app.use('/admin/*', admin);

// 模板
app.use('/templates', templates);

// api接口
app.use('/api/*', api);

// 用户界面
app.use('/*', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
