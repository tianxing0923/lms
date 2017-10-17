'use strict';
const router = require('koa-router')();
const user = require('../controllers/user');

router.get('/', async (ctx, next) => {
  var result = await user.update('58bfcdc8f1db5d68f8077bf5', {
    username: 'tianxing',
    password: '123456',
    name: '田星',
    avatar: '/upload/avatar/default.jpg',
    department: '研发部',
    position: 'Web前端开发22222',
    role: '管理员'
  });
  ctx.status = 200;
});

router.get('/add', async (ctx, next) => {
  await ctx.render('signin');
});

module.exports = router;