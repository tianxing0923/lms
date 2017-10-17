const Koa = require('koa');
const serve = require('koa-static');
const router = require('koa-router')();
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const moment = require('moment');
const nconf = require('nconf');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV;
const app = new Koa();
const config = require('./config');

// Use native Promise
mongoose.Promise = global.Promise;

// routes
// var signin = require('./routes/signin');
// var index = require('./routes/index');
// var admin = require('./routes/admin');
// var templates = require('./routes/templates');
var api = require('./routes/api');
// var users = require('./routes/users');

// middlewares
app.use(serve(path.join(__dirname, '../dist')));
app.use(bodyparser());
app.use(logger());

// forward to error handler
app.use(async(ctx, next) => {
  try {
    await next();
  } catch (e) {
    var status = e.status || 500;
    var message = e.message || '服务器错误';

    ctx.status = status;
    ctx.body = message;

    // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
    if (status == 500) {
      app.emit('error', e, ctx);
    }
  }
});

// // 用户界面
// router.use('/', index.routes(), index.allowedMethods());
// // 登录
// router.use('/signin', signin.routes(), signin.allowedMethods());

// // 后台管理
// router.use('/admin', admin.routes(), admin.allowedMethods());

// // 模板
// router.use('/templates', templates.routes(), templates.allowedMethods());

// api接口
router.use('/api', api.routes(), api.allowedMethods());

// router.get('/*', async (ctx, next) => {
//   await ctx.render('index');
// });

app.use(router.routes(), router.allowedMethods());

// error handlers
app.on('error', async(err, ctx) => {
  console.error(err.message);
});

// mongoose connect
mongoose.connect(config.db, {
  useMongoClient: true,
  keepAlive: 120
}).then(
  () => {
    console.log('mongodb has been connected');
  }
).catch(
  (err) => {
    console.error(err);
  }
);

module.exports = app;