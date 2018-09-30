'use strict';

require('../../models/course');

/**
 * 课程
 */
const mongoose = require('mongoose');
const ExtendError = require('../../utils/extend_error');
const Course = mongoose.model('Course');


/**
 * 获取课程列表
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
    let query = {
      status: 1,
    };
    if (params.category) {
      query.categories = {
        $in: params.category
      };
    }
    data.list = await Course.find(query, '-lecturerIntroduction -content -__v', {skip: (params.page - 1) * params.size, limit: params.size})
      .populate('categories', 'name');
    data.total = await Course.countDocuments(query);
    return data;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};


/**
 * 获取课程列表【管理员使用】
 * @param  {object} params 查询条件
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
    data.list = await Course.find({status: 1}, '-lecturerIntroduction -summary -content -__v', {skip: (params.page - 1) * params.size, limit: params.size})
      .populate('categories', 'name');
    data.total = await Course.countDocuments({status: 1});
    return data;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};


/**
 * 获取课程信息
 */
exports.load = async (_id) => {
  try {
    var detail = await Course.findOne({_id: _id, status: 1}, '-__v')
      .populate('categories', 'name');
    if (!detail) {
      throw new ExtendError(404, '课程不存在');
    }
    return detail;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};

/**
 * 创建课程
 */
exports.create = async (data) => {
  try {
    const category = new Course(data);
    return await category.save();
  } catch (e) {
    const errors = Object.keys(e.errors)
      .map(field => e.errors[field].message);
    throw new ExtendError(500, errors);
  }
};

/**
 * 修改课程
 */
exports.update = async (_id, data) => {
  try {
    return await Course.findByIdAndUpdate(_id, data);
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 删除课程
 */
exports.delete = async (_id) => {
  try {
    return await Course.findByIdAndUpdate(_id, {status: 0});
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};