'use strict';

require('../../models/comment');
require('../../models/article');
require('../../models/course');

/**
 * 课程
 */
const mongoose = require('mongoose');
const ExtendError = require('../../utils/extend_error');
const Comment = mongoose.model('Comment');
const Article = mongoose.model('Article');
const Course = mongoose.model('Course');


/**
 * 获取评论列表
 * @param  {object} params 查询条件
 *   reference  {number}   引用ID（文章or课程）
 * @return {array}         列表数组
 */
exports.list = async (params) => {
  let query = {
    reference: params.reference
  };
  return await Comment.find(query, '-__v').populate('user', '-password -salt -role -__v').populate('replies.user', '-password -salt -role -__v');
};


/**
 * 获取文章列表【我参与回复的文章or课程】
 * @param  {object} params 查询条件
 *   ctx   {object}   koa上下文
 *   type  {number}   类型（文章or课程）
 * @return {array}         列表数组
 */
exports.listBySelf = async (ctx, params) => {
  let data = [];
  let userId = ctx.state.user._id;
  let query = {
    type: params.type,
    $or: [{
      user: userId
    }, {
      replies: {
        $elemMatch: {
          user: userId
        }
      }
    }]
  };
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
};

/**
 * 创建评论
 */
exports.create = async (ctx, body) => {
  let data = {};
  if (body) {
    data.content = body.content;
    data.user = ctx.state.user._id;
    data.type = body.type;
    data.reference = body.reference;
  } else {
    throw new ExtendError(422, '参数不完整');
  }
  let comment = new Comment(data);
  let result = await comment.save();
  if (result) {
    switch(result.type) {
      case 'article':
        Article.findOneAndUpdate({_id: result.reference}, {$inc:{commentCount: 1}}, function () {
          console.log('文章评论量+1成功')
        });
      break;
      case 'course':
        Course.findOneAndUpdate({_id: result.reference}, {$inc:{commentCount: 1}}, function () {
          console.log('课程评论量+1成功')
        });
      break;
    }
  }
  return result;
};


/**
 * 创建评论回复
 */
exports.createReply = async (ctx, data) => {
  let comment = await Comment.findOne({_id: data.commentId});
  comment.replies.push({
    user: ctx.state.user._id,
    content: data.content
  });
  var result = await comment.save();
  if (result) {
    switch(result.type) {
      case 'article':
        Article.findOneAndUpdate({_id: result.reference}, {$inc:{commentCount: 1}}, function () {
          console.log('文章评论量+1成功')
        });
      break;
      case 'course':
        Course.findOneAndUpdate({_id: result.reference}, {$inc:{commentCount: 1}}, function () {
          console.log('课程评论量+1成功')
        });
      break;
    }
  }
  return result;
};


/**
 * 删除评论
 */
exports.delete = async (ctx, _id) => {
  if (ctx.state.user.role !== 'admin') {
    let comment = await Comment.findOne({_id: _id});
    if (!comment.user.equals(ctx.state.user._id)) {
      throw new ExtendError(400, '无权删除其他人的评论');
    }
  }

  var result = await Comment.findOneAndDelete({_id: _id});
  if (result) {
    let count = -1 - result.replies.length;
    switch(result.type) {
      case 'article':
        Article.findOneAndUpdate({_id: result.reference}, {$inc:{commentCount: count}}, function () {
          console.log('文章评论量-' + count + '成功')
        });
      break;
      case 'course':
        Course.findOneAndUpdate({_id: result.reference}, {$inc:{commentCount: count}}, function () {
          console.log('课程评论量-' + count + '成功')
        });
      break;
    }
  }
  return result;
};


/**
 * 删除评论回复
 */
exports.deleteReply = async (commentId, _id) => {
  var comment = await Comment.findOne({_id: commentId});
  comment.replies.id(_id).remove();
  var result = await comment.save();
  if (result) {
    switch(result.type) {
      case 'article':
        Article.findOneAndUpdate({_id: result.reference}, {$inc:{commentCount: -1}}, function () {
          console.log('文章评论量-1成功')
        });
      break;
      case 'course':
        Course.findOneAndUpdate({_id: result.reference}, {$inc:{commentCount: -1}}, function () {
          console.log('课程评论量-1成功')
        });
      break;
    }
  }
  return result;
};