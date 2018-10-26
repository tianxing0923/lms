const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const ExtendError = require('../utils/extend_error');
const user = require('../api/v1/user');

// 登录，拉取用户信息
const fetchUser = async (username, password) => {
  var data = await user.signin({
    username: username,
    password: password
  });
  return data;
};

// 序列化ctx.login()触发
passport.serializeUser(function (user, done) {
  done(null, user.id);
})

// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function (id, done) {
  try {
    const data = await user.load(id);
    done(null, data);
  } catch (err) {
    throw new ExtendError(500, e);
  }
})


// 本地登录校验
passport.use(new LocalStrategy(async (username, password, done) => {
  var data = await fetchUser(username, password);
  done(null, data);
}));


// 是否登录
exports.isLogined = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.status = 401;
    ctx.body = '未登录';
  }
};

// 是否是管理员
exports.isAdmin = async (ctx, next) => {
  if (ctx.state.user.role == 'admin') {
    await next();
  } else {
    ctx.status = 403;
    ctx.body = '访问被拒绝';
  }
};