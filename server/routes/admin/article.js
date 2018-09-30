const router = require('koa-router')();
const article = require('../../api/v1/article');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await article.listbyadmin({
    page: ctx.query.page,
    size: ctx.query.size
  });
  ctx.status = 200;
  ctx.body = data;
});

// 获取详情
router.get('/:id', async (ctx, next) => {
  var data = await article.load(ctx.params.id);
  ctx.status = 200;
  ctx.body = data;
});

// 新增文章
router.post('/', async (ctx, next) => {
  var data = await article.create(ctx.request.body);
  ctx.status = 201;
});

// 修改文章
router.put('/:id', async (ctx, next) => {
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
    delete ctx.request.body.type;
    delete ctx.request.body.user;
    delete ctx.request.body.readCount;
    delete ctx.request.body.commentCount;
    delete ctx.request.body.essence;
    delete ctx.request.body.top;
    delete ctx.request.body.status;
    delete ctx.request.body.createdAt;
    await article.update(ctx.params.id, ctx.request.body);
    break;
  }
  ctx.status = 201;
});

// 删除文章
router.delete('/:id', async (ctx, next) => {
  var data = await article.delete(ctx.params.id);
  ctx.status = 204;
});

module.exports = router;