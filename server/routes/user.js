const router = require('koa-router')();
const user = require('../api/v1/user');

// 获取当前用户
router.get('/current', async (ctx, next) => {
  var data = await user.load(ctx.state.user._id);
  ctx.status = 200;
  ctx.body = data;
});

module.exports = router;