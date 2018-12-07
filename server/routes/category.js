const router = require('koa-router')();
const category = require('../api/v1/category');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await category.list();
  ctx.status = 200;
  ctx.body = data;
});

module.exports = router;