const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('admin');
});

router.get('/*', async (ctx, next) => {
  await ctx.render('admin');
});

module.exports = router;