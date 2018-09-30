const router = require('koa-router')();
const article = require('../api/v1/article');

// 获取列表
router.get('/', async (ctx, next) => {
  var data = await article.list(ctx.query);
  ctx.status = 200;
  ctx.body = data;
});

// 获取列表【我的文章】
router.get('/self', async (ctx, next) => {
  var data = await article.listbyself({
    type: ctx.query.type,
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

// 获取详情【用于编辑】
router.get('/loadbyedit/:id', async (ctx, next) => {
  var data = await article.loadbyedit(ctx.params.id);
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
  debugger
  var body = ctx.request.body;
  delete body.type;
  delete body.user;
  delete body.readCount;
  delete body.commentCount;
  delete body.essence;
  delete body.top;
  delete body.status;
  delete body.createdAt;
  if (body.categories)
  var data = await article.update(ctx.params.id, body);
  ctx.status = 201;
});

// 删除文章
router.delete('/:id', async (ctx, next) => {
  var data = await article.delete(ctx.params.id);
  ctx.status = 204;
});

module.exports = router;