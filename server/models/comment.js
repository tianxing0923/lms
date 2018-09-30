'use strict';

/**
 * Module dependencies.
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Comment Schema
 */
const CommentSchema = new Schema({
  content: { type: String, default: '', trim: true },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, default: '', trim: true },
  reference: { type: Schema.Types.ObjectId },
  replies: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String, default: '', trim: true },
    createdAt: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now }
});


mongoose.model('Comment', CommentSchema);