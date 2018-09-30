'use strict';

require('../../models/category');

/**
 * 分类
 */
const mongoose = require('mongoose');
const ExtendError = require('../../utils/extend_error');
const Category = mongoose.model('Category');

/**
 * 获取分类列表
 * @param  {object} params 查询条件
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
    data.list = await Category.find({status: 1}, '-__v', {skip: (params.page - 1) * params.size, limit: params.size});
    data.total = await Category.countDocuments({status: 1});
    return data;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};


/**
 * 获取分类信息
 */
exports.load = async (_id) => {
  try {
    var detail = await Category.findOne({_id: _id, status: 1}, '-__v');
    if (!detail) {
      throw new ExtendError(404, '分类不存在');
    }
    return detail;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};

/**
 * 创建分类
 */
exports.create = async (data) => {
  try {
    const category = new Category(data);
    return await category.save();
  } catch (e) {
    const errors = Object.keys(e.errors)
      .map(field => e.errors[field].message);
    throw new ExtendError(500, errors);
  }
};

/**
 * 修改分类
 */
exports.update = async (_id, data) => {
  try {
    return await Category.findByIdAndUpdate(_id, data);
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 删除分类
 */
exports.delete = async (_id) => {
  try {
    return await Category.findByIdAndUpdate(_id, {status: 0});
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};