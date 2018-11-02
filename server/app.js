const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session');
const passport = require('koa-passport');
const cors = require('@koa/cors');
const moment = require('moment');
const nconf = require('nconf');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const env = process.env.NODE_ENV;
const app = new Koa();
const router = new Router();
const config = require('./config');
const authorization = require('./middlewares/authorization');

// session配置项
const sessionConfig = {
  key: 'lms', /*  cookie的key  */
  maxAge: 86400000 * 30, /* cookie的过期时间 */
  autoCommit: true, /* 自动提交报头 */
  overwrite: true, /* 是否可以重写 */
  httpOnly: true, /* 是否只有HTTP只读 */
  signed: true, /* 是否签名 */
  rolling: false, /* 在每次请求时强行设置 cookie，这将重置 cookie 过期时间 */
  renew: false, /* 当会话几乎过期时更新会话，因此我们可以始终保持用户登录 */
};

// Use native Promise
mongoose.Promise = global.Promise;

// routes
var sign = require('./routes/sign');
var api = require('./routes/api');

// middlewares
app.use(cors({
  credentials: true
}));
app.use(serve(path.join(__dirname, 'uploads')));
app.use(bodyparser());
app.use(logger());

app.keys = ['eric-secret'];
app.use(session(sessionConfig, app));

app.use(passport.initialize());
app.use(passport.session());

// 错误处理
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    var status = e.status || 500;
    var message = e.message || '服务器异常';

    // 触发 koa 统一错误事件，可以打印出详细的错误堆栈 log
    if (status == 500) {
      if (e.errors) {
        message = Object.keys(e.errors).map(field => e.errors[field].message);
      }

      app.emit('error', e, ctx);
    }
    ctx.status = status;
    ctx.body = message;
  }
});

router.use('/sign', sign.routes(), sign.allowedMethods());

// api接口
router.use('/api', authorization.isLogined, api.routes(), api.allowedMethods());
app.use(router.routes(), router.allowedMethods());

// error handlers
app.on('error', async(err, ctx) => {
  console.error(err.message);
});

// mongoose connect
mongoose.connect(config.db, {
  useNewUrlParser: true,
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