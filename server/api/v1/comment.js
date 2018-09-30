'use strict';

require('../../models/comment');

/**
 * 课程
 */
const mongoose = require('mongoose');
const ExtendError = require('../../utils/extend_error');
const Comment = mongoose.model('Comment');


/**
 * 获取评论列表
 * @param  {object} params 查询条件
 *   reference  {number}   引用ID（文章or课程）
 * @return {array}         列表数组
 */
exports.list = async (params) => {
  try {
    let query = {
      reference: params.reference
    };
    return await Comment.find(query, '-__v').populate('user', '-password -salt -role -__v').populate('replies.user', '-password -salt -role -__v');
  } catch (e) {
    throw new ExtendError(500, e);
  }
};


/**
 * 获取文章列表【我参与回复的文章or课程】
 * @param  {object} params 查询条件
 *   type  {number}   类型（文章or课程）
 * @return {array}         列表数组
 */
exports.listbyself = async (params) => {
  try {
    let data = [];
    let user = new mongoose.Types.ObjectId('5b86744b21b34a5bb9f82baa');
    let query = {
      type: params.type,
      $or: [{
        user: user
      }, {
        replies: {
          $elemMatch: {
            user: user
          }
        }
      }]
    };
    // let populateParams = {};
    // if (params.type == 'article') {
    //   populateParams = {path: 'reference', model: 'Article', select: '-content -__v'};
    // } else if (params.type == 'course') {
    //   populateParams = {path: 'reference', model: 'Course', select: '-lecturerIntroduction -content -__v'};
    // }
    let loopupOpts = {};
    if (params.type == 'article') {
      loopupOpts = {from: 'articles', localField: '_id', foreignField: '_id', as: '_id'};
    } else if (params.type == 'course') {
      loopupOpts = {from: 'courses', localField: '_id', foreignField: '_id', as: '_id'};
    }

    data = await Comment.aggregate([
      {$match: query},
      {$group: {_id: '$reference'}},
      {$lookup: loopupOpts},
      {$unwind: '$_id'}
    ])
    return data;
  } catch (e) {
    throw new ExtendError(500, e);
  }
};

/**
 * 创建评论
 */
exports.create = async (data) => {
  try {
    data.user = '5b86744b21b34a5bb9f82baa';
    const comment = new Comment(data);
    return await comment.save();
  } catch (e) {
    const errors = Object.keys(e.errors)
      .map(field => e.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 创建评论回复
 */
exports.createReply = async (data) => {
  try {
    let comment = await Comment.findOne({_id: data.commentId});
    comment.replies.push({
      user: '5b86744b21b34a5bb9f82baa',
      content: data.content
    });
    return await comment.save();
  } catch (e) {
    const errors = Object.keys(e.errors)
      .map(field => e.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 删除评论
 */
exports.delete = async (_id) => {
  try {
    return await Comment.findOneAndDelete({_id: _id});
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};


/**
 * 删除评论回复
 */
exports.deleteReply = async (commentId, _id) => {
  try {
    var comment = await Comment.findOne({_id: commentId});
    comment.replies.id(_id).remove();
    return await comment.save();
  } catch (err) {
    const errors = Object.keys(err.errors)
      .map(field => err.errors[field].message);
    throw new ExtendError(500, errors);
  }
};