const router = require('koa-router')();
const course = require('../../api/v1/course');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await course.listByAdmin({
    page: ctx.query.page,
    size: ctx.query.size
  });
  ctx.status = 200;
  ctx.body = data;
});

// 获取详情
router.get('/:id', async (ctx, next) => {
  var data = await course.loadByAdmin(ctx.params.id);
  ctx.status = 200;
  ctx.body = data;
});

// 新增课程
router.post('/', async (ctx, next) => {
  var data = await course.create(ctx.request.body);
  ctx.status = 201;
});

// 修改课程
router.put('/:id', async (ctx, next) => {
  var data = await course.update(ctx.params.id, ctx.request.body);
  ctx.status = 201;
});

// 删除课程
router.delete('/:id', async (ctx, next) => {
  var data = await course.delete(ctx.params.id);
  ctx.status = 204;
});

module.exports = router;