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
};


/**
 * 获取课程列表【管理员使用】
 * @param  {object} params 查询条件
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
    status: 1,
  };
  data.list = await Course.find(query, '-lecturerIntroduction -summary -content -__v', {skip: (params.page - 1) * params.size, limit: params.size})
    .populate('categories', 'name');
  data.total = await Course.countDocuments(query);
  return data;
};


/**
 * 获取课程信息
 */
exports.load = async (_id) => {
  var detail = await Course.findOne({_id: _id, status: 1}, '-__v')
    .populate('categories', 'name');

  if (!detail) {
    throw new ExtendError(404, '课程不存在');
  } else {
    Course.findOneAndUpdate({_id: _id}, {$inc:{readCount: 1}}, function () {
      console.log('阅读量+1成功')
    });
  }
  return detail;
};


/**
 * 获取课程信息【管理员使用】
 */
exports.loadByAdmin = async (_id) => {
  var detail = await Course.findOne({_id: _id, status: 1}, '-__v');
  if (!detail) {
    throw new ExtendError(404, '课程不存在');
  }
  return detail;
};

// 设置表单数据
const setFormData = (body) => {
  var data = {};
  if (body) {
    data.title = body.title;
    data.lecturer = body.lecturer;
    data.lecturerIntroduction = body.lecturerIntroduction;
    data.categories = body.categories;
    data.summary = body.summary;
    data.content = body.content;
  } else {
    throw new ExtendError(422, '参数不完整');
  }
  return data;
};

/**
 * 创建课程
 */
exports.create = async (body) => {
  var data = setFormData(body);
  const category = new Course(data);
  return await category.save();
};

/**
 * 修改课程
 */
exports.update = async (_id, body) => {
  var data = setFormData(body);
  return await Course.findOneAndUpdate({_id: _id}, data);
};


/**
 * 删除课程
 */
exports.delete = async (_id) => {
  return await Course.findOneAndUpdate({_id: _id}, {status: 0});
};