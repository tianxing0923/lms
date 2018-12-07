'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Article Schema
 */

const ArticleSchema = new Schema({
  title: { type: String, default: '', trim: true, required: [true, '标题不能为空'] },
  type: { type: String, default: '', trim: true, required: [true, '类型不能为空'] },
  categories: [{ type: Schema.Types.ObjectId, ref: 'Category', required: [true, '分类不能为空'] }],
  content: { type: String, default: '', trim: true, required: [true, '内容不能为空'] },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, '作者不能为空'] },
  readCount: { type: Number, default: 0 },
  commentCount: { type: Number, default: 0 },
  essence: { type: Date, default: null },
  top: { type: Date, default: null },
  status: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

mongoose.model('Article', ArticleSchema);
