const router = require('koa-router')();
const comment = require('../api/v1/comment');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await comment.list({
    reference: ctx.query.reference
  });
  ctx.status = 200;
  ctx.body = data;
});

// 获取列表【我参与回复的文章】
router.get('/self', async (ctx, next) => {
  var data = await comment.listbyself(ctx.query);
  ctx.status = 200;
  ctx.body = data;
});

// 新增评论
router.post('/', async (ctx, next) => {
  var data = await comment.create(ctx.request.body);
  ctx.status = 201;
});

// 新增评论回复
router.post('/reply', async (ctx, next) => {
  var data = await comment.createReply(ctx.request.body);
  ctx.status = 201;
});

// 删除评论
router.delete('/:id', async (ctx, next) => {
  var data = await comment.delete(ctx.params.id);
  ctx.status = 204;
});

// 删除评论回复
router.delete('/:commentId/:id', async (ctx, next) => {
  var data = await comment.deleteReply(ctx.params.commentId, ctx.params.id);
  ctx.status = 204;
});

module.exports = router;