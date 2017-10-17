const router = require('koa-router')();

router.get('/:filename', async (ctx, next) => {
  await ctx.render('templates/' + ctx.params.filename);
});

router.get('/:folder/:filename', async (ctx, next) => {
  await ctx.render('templates/' + ctx.params.folder + '/' + ctx.params.filename);
});

module.exports = router;