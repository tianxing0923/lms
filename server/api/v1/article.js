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
  try {
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
  } catch (e) {
    throw new ExtendError(500, e);
  }
};


/**
 * 获取文章列表
 * @param  {object} params 查询条件
 *   type  {string}   类型
 *   page  {number}   页索引
 *   size  {number}   页大小
 * @return {array}         列表数组
 */
exports.listbyself = async (params) => {
  try {
    params.page = parseInt(params.page, 10);
    params.size = parseInt(params.size, 10);
    let data = {
      list: [],
      page: params.page,
      size: params.size,
      total: 0
    };
    let user = '5b86744b21b34a5bb9f82baa';
    let query = {
      status: 1,
      type: params.type,
      user: user
    };
    data.list = await Article.find(query, '-content -__v', {skip: (params.page - 1) * params.size, limit: params.size})
      .populate('categories', 'name');
    data.total = await Article.countDocuments(query);
    return data;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};


/**
 * 获取文章列表【管理员使用】
 * @param  {object} params 查询条件
 *   type  {string}   类型
 *   page  {number}   页索引
 *   size  {number}   页大小
 * @return {array}         列表数组
 */
exports.listbyadmin = async (params) => {
  try {
    params.page = parseInt(params.page, 10);
    params.size = parseInt(params.size, 10);
    let data = {
      list: [],
      page: params.page,
      size: params.size,
      total: 0
    };
    data.list = await Article.find({status: 1}, '-content -__v', {skip: (params.page - 1) * params.size, limit: params.size, sort: {top: 'desc', createdAt: 'desc'}})
      .populate('categories', 'name').populate('user', 'username name');
    data.total = await Article.countDocuments({status: 1});
    return data;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};


/**
 * 获取文章信息
 */
exports.load = async (_id) => {
  try {
    var detail = await Article.findOne({_id: _id, status: 1}, '-__v')
      .populate('categories', 'name').populate('user', '-password -salt -role -__v');
    if (!detail) {
      throw new ExtendError(404, '文章不存在');
    }
    return detail;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};


/**
 * 获取文章信息【用于编辑】
 */
exports.loadbyedit = async (_id) => {
  try {
    var detail = await Article.findOne({_id: _id, status: 1}, '-__v');
    if (!detail) {
      throw new ExtendError(404, '文章不存在');
    }
    return detail;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};

/**
 * 创建文章
 */
exports.create = async (data) => {
  try {
    data.user = '5b86744b21b34a5bb9f82baa';
    const article = new Article(data);
    return await article.save();
  } catch (e) {
    const errors = Object.keys(e.errors)
      .map(field => e.errors[field].message);
    throw new ExtendError(500, errors);
  }
};

/**
 * 修改文章
 */
exports.update = async (_id, data) => {
  try {
    data.updatedAt = Date.now();
    return await Article.findOneAndUpdate({_id: _id}, data);
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 删除文章
 */
exports.delete = async (_id) => {
  try {
    return await Article.findOneAndUpdate({_id: _id}, {status: 0});
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 设为精华
 */
exports.essence = async (_id) => {
  try {
    return await Article.findOneAndUpdate({_id: _id}, {essence: Date.now()});
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 取消精华
 */
exports.unessence = async (_id) => {
  try {
    return await Article.findOneAndUpdate({_id: _id}, {essence: null});
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 设为置顶
 */
exports.top = async (_id) => {
  try {
    debugger
    return await Article.findOneAndUpdate({_id: _id}, {top: Date.now()});
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 取消置顶
 */
exports.untop = async (_id) => {
  try {
    return await Article.findOneAndUpdate({_id: _id}, {top: null});
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};