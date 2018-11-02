const router = require('koa-router')();
const comment = require('../../api/v1/comment');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await comment.list({
    page: ctx.query.page,
    size: ctx.query.size
  });
  ctx.status = 200;
  ctx.body = data;
});

// 删除评论
router.delete('/:id', async (ctx, next) => {
  var data = await comment.delete(ctx.params.id);
  ctx.status = 204;
});

module.exports = router;