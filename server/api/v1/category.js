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
};


/**
 * 获取分类信息
 */
exports.load = async (_id) => {
  var detail = await Category.findOne({_id: _id, status: 1}, '-__v');
  if (!detail) {
    throw new ExtendError(404, '分类不存在');
  }
  return detail;
};

/**
 * 创建分类
 */
exports.create = async (data) => {
  const category = new Category(data);
  return await category.save();
};

/**
 * 修改分类
 */
exports.update = async (_id, data) => {
  return await Category.findByIdAndUpdate(_id, data);
};


/**
 * 删除分类
 */
exports.delete = async (_id) => {
  return await Category.findByIdAndUpdate(_id, {status: 0});
};