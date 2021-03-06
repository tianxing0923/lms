'use strict';

/**
 * 用户
 */
require('../../models/user');
const mongoose = require('mongoose');
const ExtendError = require('../../utils/extend_error');
const User = mongoose.model('User');
const crypto = require('crypto');

/**
 * 获取用户列表
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
  data.list = await User.find({status: 1}, '-salt -password -__v', {skip: (params.page - 1) * params.size, limit: params.size});
  data.total = await User.countDocuments({status: 1});
  return data;
};


/**
 * 获取用户信息
 */
exports.load = async (_id) => {
  var info = await User.findOne({_id: _id, status: 1}, '-salt -password -__v');
  if (!info) {
    throw new ExtendError(404, '用户不存在');
  }
  return info;
};

/**
 * 创建用户
 */
exports.create = async (data) => {
  if (!data.password) {
    data.password = '123456';
  }
  const user = new User(data);
  return await user.save();
};

/**
 * 修改用户
 */
exports.update = async (_id, data) => {
  return await User.findByIdAndUpdate(_id, data);
};


/**
 * 删除用户
 */
exports.delete = async (_id) => {
  return await User.findByIdAndUpdate(_id, {status: 0});
};

/**
 * 用户登录
 */
exports.signin = async (data) => {
  var result = {
    user: null,
    info: '',
    status: 422
  };
  var user = await User.findOne({username: data.username, status: 1}, '-__v');
  if (user) {
    let password = crypto.createHmac('sha256', user.salt).update(data.password).digest('hex');
    if (password == user.password) {
      delete user.salt;
      delete user.password;
      result.user = user;
      result.info = '登录成功';
      result.status = 200;
    } else {
      result.info = '用户名或密码不正确';
    }
  } else {
    result.info = '用户不存在';
  }
  return result;
};

/**
 * 用户退出
 */
exports.signout = function (req, res) {
  req.logout();
  res.redirect('/signin');
};