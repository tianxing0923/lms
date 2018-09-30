const router = require('koa-router')();
const user = require('../../api/v1/user');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await user.list({
    page: ctx.query.page,
    size: ctx.query.size
  });
  ctx.status = 200;
  ctx.body = data;
});

// 新增用户
router.post('/', async (ctx, next) => {
  var data = await user.create(ctx.request.body);
  ctx.status = 201;
});

// 修改用户
router.put('/:id', async (ctx, next) => {
  var data = await user.update(ctx.params.id, ctx.request.body);
  ctx.status = 201;
});

// 删除用户
router.delete('/:id', async (ctx, next) => {
  var data = await user.delete(ctx.params.id);
  ctx.status = 204;
});

module.exports = router;