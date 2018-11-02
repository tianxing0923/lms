const router = require('koa-router')();
const course = require('../api/v1/course');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await course.list({
    page: ctx.query.page,
    size: ctx.query.size,
    category: ctx.query.category
  });
  ctx.status = 200;
  ctx.body = data;
});

// 获取详情
router.get('/:id', async (ctx, next) => {
  var data = await course.load(ctx.params.id);
  ctx.status = 200;
  ctx.body = data;
});

module.exports = router;