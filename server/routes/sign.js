const router = require('koa-router')();
const passport = require('koa-passport');
const authorization = require('../middlewares/authorization');

// 登录
router.post('/in', async (ctx, next) => {
  await passport.authenticate('local', function (err, user, info, status) {
    ctx.status = user.status;
    ctx.body = user.info;
    if (user.user) {
      ctx.login(user.user);
    }
  })(ctx, next);
});

// 退出
router.post('/out', (ctx, next) => {
  ctx.logout();
  ctx.status = 201;
  ctx.body = '退出成功';
});

module.exports = router;