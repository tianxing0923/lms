const router = require('koa-router')();
const category = require('../../api/v1/category');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await category.listByAdmin({
    page: ctx.query.page,
    size: ctx.query.size
  });
  ctx.status = 200;
  ctx.body = data;
});

// 新增分类
router.post('/', async (ctx, next) => {
  var data = await category.create(ctx.request.body);
  ctx.status = 201;
});

// 修改分类
router.put('/:id', async (ctx, next) => {
  var data = await category.update(ctx.params.id, ctx.request.body);
  ctx.status = 201;
});

// 删除分类
router.delete('/:id', async (ctx, next) => {
  var data = await category.delete(ctx.params.id);
  ctx.status = 204;
});

module.exports = router;