'use strict';

require('../../models/article');

/**
 * 文章
 */
const mongoose = require('mongoose');
const ExtendError = require('../../utils/extend_error');
const Article = mongoose.model('Article');


/**
 * 获取文章列表
 * @param  {object} params 查询条件
 *   type  {string}   类型
 *   page  {number}   页索引
 *   size  {number}   页大小
 * @return {array}         列表数组
 */
exports.list = async (params) => {
  params.page = parseInt(params.page, 10);
  params.size = parseInt(params.size, 10);
  let data = {
    list: [],
    page: params.page,
    size: params.size,
    total: 0
  };
  let query = {
    status: 1,
  };
  if (params.category) {
    query.categories = {
      $in: params.category
    };
  }
  if (params.essence) {
    query.essence = {
      $ne: null
    };
  }
  if (params.type) {
    query.type = params.type;
  }
  data.list = await Article.find(query, '-content -__v', {skip: (params.page - 1) * params.size, limit: params.size, sort: {top: 'desc', createdAt: 'desc'}})
    .populate('categories', 'name').populate('user', '-password -salt -role -__v');
  data.total = await Article.countDocuments(query);
  return data;
};


/**
 * 获取文章列表
 * @param  {object} ctx    koa上下文
 * @param  {object} params 查询条件
 *   type  {string}   类型
 *   page  {number}   页索引
 *   size  {number}   页大小
 * @return {array}         列表数组
 */
exports.listBySelf = async (ctx, params) => {
  params.page = parseInt(params.page, 10);
  params.size = parseInt(params.size, 10);
  let data = {
    list: [],
    page: params.page,
    size: params.size,
    total: 0
  };
  let query = {
    status: 1,
    type: params.type,
    user: ctx.state.user._id
  };
  data.list = await Article.find(query, '-content -__v', {skip: (params.page - 1) * params.size, limit: params.size})
    .populate('categories', 'name');
  data.total = await Article.countDocuments(query);
  return data;
};


/**
 * 获取文章列表【管理员使用】
 * @param  {object} params 查询条件
 *   type  {string}   类型
 *   page  {number}   页索引
 *   size  {number}   页大小
 * @return {array}         列表数组
 */
exports.listByAdmin = async (params) => {
  params.page = parseInt(params.page, 10);
  params.size = parseInt(params.size, 10);
  let data = {
    list: [],
    page: params.page,
    size: params.size,
    total: 0
  };
  let query = {
    status: 1
  };
  data.list = await Article.find(query, '-content -__v', {skip: (params.page - 1) * params.size, limit: params.size, sort: {top: 'desc', createdAt: 'desc'}})
    .populate('categories', 'name').populate('user', 'username name');
  data.total = await Article.countDocuments(query);
  return data;
};


/**
 * 获取文章信息
 */
exports.load = async (_id) => {
  var detail = await Article.findOne({_id: _id, status: 1}, '-__v')
    .populate('categories', 'name').populate('user', '-password -salt -role -__v');
  if (!detail) {
    throw new ExtendError(404, '文章不存在或已被删除');
  } else {
    Article.findOneAndUpdate({_id: _id}, {$inc:{readCount: 1}}, function () {
      console.log('阅读量+1成功')
    });
  }
  return detail;
};


/**
 * 获取文章信息【用于编辑】
 */
exports.loadbyedit = async (_id) => {
  var detail = await Article.findOne({_id: _id, status: 1}, '-__v');
  if (!detail) {
    throw new ExtendError(404, '文章不存在或已被删除');
  }
  return detail;
};

/**
 * 创建文章
 */
exports.create = async (ctx, data) => {
  data.user = ctx.state.user._id;
  const article = new Article(data);
  return await article.save();
};

/**
 * 修改文章
 */
exports.update = async (_id, data) => {
  data.updatedAt = Date.now();
  return await Article.findOneAndUpdate({_id: _id}, data);
};


/**
 * 删除文章
 */
exports.delete = async (ctx, _id) => {
  debugger
  let article = await Article.findOne({_id: _id});
  if (!article.user.equals(ctx.state.user._id)) {
    throw new ExtendError(400, '无权删除其他人的文章');
  }
  article.status = 0;
  return await article.save();
};

/**
 * 删除文章【管理员使用】
 * @param  {object} ctx koa上下文
 * @param  {string} _id 文章ID
 * @return {object}     文章对象
 */
exports.deleteByAdmin = async (ctx, _id) => {
  return await Article.findOneAndUpdate({_id: _id}, {status: 0});
};


/**
 * 设为精华
 */
exports.essence = async (_id) => {
  return await Article.findOneAndUpdate({_id: _id}, {essence: Date.now()});
};


/**
 * 取消精华
 */
exports.unessence = async (_id) => {
  return await Article.findOneAndUpdate({_id: _id}, {essence: null});
};


/**
 * 设为置顶
 */
exports.top = async (_id) => {
  return await Article.findOneAndUpdate({_id: _id}, {top: Date.now()});
};


/**
 * 取消置顶
 */
exports.untop = async (_id) => {
  return await Article.findOneAndUpdate({_id: _id}, {top: null});
};