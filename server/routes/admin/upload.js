const crypto = require('crypto');
const fs = require('fs');
const moment = require('moment');
const router = require('koa-router')();
const multer = require('koa-multer');
const config = require('../../config');
const utils = require('../../utils');

// 图片multer配置
var imageStorage = multer.diskStorage({
  // 文件保存路径
  destination: (req, file, cb) => {
    var str = moment().format('YYYYMMDD');
    var path = 'server/upload/images/' + str;
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  // 修改文件名称
  filename: utils.getFilename
});

// 图片上传
var imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 50
  }
});


// 视频multer配置
var videoStorage = multer.diskStorage({
  // 文件保存路径
  destination: (req, file, cb) => {
    var str = moment().format('YYYYMMDD');
    var path = 'server/upload/videos/' + str;
    if (!fs.existsSync(path)){
      fs.mkdirSync(path);
    }
    cb(null, path);
  },
  // 修改文件名称
  filename: utils.getFilename
});

// 视频上传
var videoUpload = multer({
  storage: videoStorage,
  limits: {
    files: 50
  }
});

// 上传图片
router.post('/image', imageUpload.single('file'), async (ctx, next) => {
  var path = ctx.req.file.destination.substring('server/upload'.length);
  ctx.status = 200;
  ctx.body = {
    link: config.url + path + '/' + ctx.req.file.filename
  }
});


// 上传视频
router.post('/video', videoUpload.signle('file'), async (ctx, next) => {
  var path = ctx.req.file.destination.substring('server/upload'.length);
  ctx.status = 200;
  ctx.body = {
    link: config.url + path + '/' + ctx.req.file.filename
  }
});


module.exports = router;