const router = require('koa-router')();
const authorization = require('../middlewares/authorization');


const userRouter = require('./user');
const categoryRouter = require('./category');
const courseRouter = require('./course');
const articleRouter = require('./article');
const commentRouter = require('./comment');

const uploadRouter = require('./upload');

const adminUserRouter = require('./admin/user');
const adminCategoryRouter = require('./admin/category');
const adminCourseRouter = require('./admin/course');
const adminArticleRouter = require('./admin/article');
const adminUploadRouter = require('./admin/upload');

// 用户接口
router.use('/users', userRouter.routes(), userRouter.allowedMethods());
router.use('/categories', categoryRouter.routes(), categoryRouter.allowedMethods());
router.use('/courses', courseRouter.routes(), courseRouter.allowedMethods());
router.use('/articles', articleRouter.routes(), articleRouter.allowedMethods());
router.use('/comments', commentRouter.routes(), commentRouter.allowedMethods());

router.use('/upload', uploadRouter.routes(), uploadRouter.allowedMethods());

// 后台管理
// 用户
router.use('/admin/users', authorization.isAdmin, adminUserRouter.routes(), adminUserRouter.allowedMethods());

// 分类
router.use('/admin/categories', authorization.isAdmin, adminCategoryRouter.routes(), adminCategoryRouter.allowedMethods());

// 课程
router.use('/admin/courses', authorization.isAdmin, adminCourseRouter.routes(), adminCourseRouter.allowedMethods());

// 文章
router.use('/admin/articles', authorization.isAdmin, adminArticleRouter.routes(), adminArticleRouter.allowedMethods());

// 上传
router.use('/admin/upload', authorization.isAdmin, adminUploadRouter.routes(), adminUploadRouter.allowedMethods());

module.exports = router;