const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const ExtendError = require('../utils/extend_error');
const user = require('../api/v1/user');

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


// /*
//  *  User authorization routing middleware
//  */

// exports.user = {
//   hasAuthorization: function (req, res, next) {
//     if (req.profile.id != req.user.id) {
//       req.flash('info', 'You are not authorized');
//       return res.redirect('/users/' + req.profile.id);
//     }
//     next();
//   }
// };

// /*
//  *  Article authorization routing middleware
//  */

// exports.article = {
//   hasAuthorization: function (req, res, next) {
//     if (req.article.user.id != req.user.id) {
//       req.flash('info', 'You are not authorized');
//       return res.redirect('/articles/' + req.article.id);
//     }
//     next();
//   }
// };

// /**
//  * Comment authorization routing middleware
//  */

// exports.comment = {
//   hasAuthorization: function (req, res, next) {
//     // if the current user is comment owner or article owner
//     // give them authority to delete
//     if (req.user.id === req.comment.user.id || req.user.id === req.article.user.id) {
//       next();
//     } else {
//       req.flash('info', 'You are not authorized');
//       res.redirect('/articles/' + req.article.id);
//     }
//   }
// };