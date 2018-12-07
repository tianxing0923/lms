const router = require('koa-router')();
const article = require('../../api/v1/article');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await article.listByAdmin({
    page: ctx.query.page,
    size: ctx.query.size
  });
  ctx.status = 200;
  ctx.body = data;
});

// 置顶、精华
router.put('/:id', async (ctx, next) => {
  var status = 201;
  switch (ctx.request.body.action) {
  case 'essence':
    await article.essence(ctx.params.id);
    break;
  case 'unessence':
    await article.unessence(ctx.params.id);
    break;
  case 'top':
    await article.top(ctx.params.id);
    break;
  case 'untop':
    await article.untop(ctx.params.id);
    break;
  default:
    status = 404;
    break;
  }
  ctx.status = status;
});

// 删除文章
router.delete('/:id', async (ctx, next) => {
  var data = await article.deleteByAdmin(ctx.params.id);
  ctx.status = 204;
});

module.exports = router;